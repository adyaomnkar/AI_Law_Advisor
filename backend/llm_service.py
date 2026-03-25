from config import GEMINI_API_KEY, ANTHROPIC_API_KEY, get_llm_provider

SYSTEM_PROMPT = """You are AI Law Advisor, a legal information chatbot for Indian law.
Your role is to explain legal rights in plain, simple language (8th-grade reading level).

Rules:
1. ALWAYS cite specific sections from the provided legal context
2. Use bullet points for clarity
3. Suggest actionable next steps
4. Include relevant legal aid resources when appropriate
5. NEVER provide legal advice - only legal information
6. If the context doesn't contain relevant information, say so honestly
7. Format responses in markdown with headers, bullets, and blockquotes for citations
8. ALWAYS try to help the user. Even if the query seems vague or not directly legal, try to understand what legal issue they might be facing and guide them. For example, "i am muslim and my land taken forcefully" is a property rights / land grabbing issue — help them.
9. NEVER reject a query by saying it is not legal. Every person's situation may have a legal angle — find it and help.
10. If someone says something like "hi" or a greeting, respond warmly, introduce yourself briefly, and ask how you can help with their legal situation.

Respond in {language}."""

def _build_prompt(query, context_chunks, language='English'):
    context = "\n\n".join([f"[{c['source']}]\n{c['text']}" for c in context_chunks])
    return f"""{SYSTEM_PROMPT.format(language=language)}

## Legal Context:
{context}

## User Question:
{query}

Provide a clear, helpful response based on the legal context above."""


async def generate_response(query, context_chunks, language='en'):
    lang_map = {'en': 'English', 'hi': 'Hindi'}
    lang = lang_map.get(language, 'English')
    prompt = _build_prompt(query, context_chunks, lang)
    provider = get_llm_provider()

    if provider == 'gemini':
        return await _gemini_generate(prompt)
    elif provider == 'claude':
        return await _claude_generate(prompt)
    else:
        return _fallback_response(query, context_chunks)


async def _gemini_generate(prompt):
    import google.generativeai as genai
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content(prompt)
    return response.text


async def _claude_generate(prompt):
    import anthropic
    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1500,
        messages=[{"role": "user", "content": prompt}]
    )
    return message.content[0].text


def _fallback_response(query, context_chunks):
    if not context_chunks:
        return "I couldn't find relevant legal information for your query. Please try rephrasing or check the Legal Aid page for professional assistance."

    sections = []
    for c in context_chunks[:3]:
        sections.append(f"**{c['source']}**: {c['text'][:200]}...")

    return f"""## Relevant Legal Information

Based on your question, here are the relevant legal provisions:

{chr(10).join('- ' + s for s in sections)}

> **Note:** No AI API key is configured. Add a `GEMINI_API_KEY` or `ANTHROPIC_API_KEY` to your `.env` file for AI-powered plain language explanations.

*For personalized legal advice, please consult a qualified lawyer.*"""
