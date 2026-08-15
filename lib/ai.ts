import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export async function findPermits(projectDescription: string, zipCode: string) {
  const prompt = `You are a permit research assistant for US contractors and homeowners. Output ONLY valid JSON.

Project: ${projectDescription}
Zip: ${zipCode}

JSON format:
[{"name":"permit type","department":"city dept","fee":"$XX-XX","processingTime":"X-Y days","requiredDocuments":["doc1"],"directLink":"https://example.gov"}]`;

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: 'You are a helpful assistant. Output only valid JSON, no markdown, no explanation.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });
    const text = completion.choices[0]?.message?.content || '';
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('Permit finder error:', error);
    throw new Error('Failed to find permits. Please try again.');
  }
}

export async function draftApplication(projectDescription: string, permitType: string, zipCode: string) {
  const prompt = `You are a permit application drafter. Output ONLY valid JSON.

Project: ${projectDescription}
Permit: ${permitType}
Zip: ${zipCode}

JSON format:
{"applicantName":"Applicant Name","projectAddress":"123 Main St","projectDescription":"...","estimatedCost":"$XX,XXX","contractorInfo":{"name":"...","licenseNumber":"...","phone":"...","email":"..."},"scopeOfWork":"...","complianceNotes":"..."}`;

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: 'You are a helpful assistant. Output only valid JSON, no markdown, no explanation.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });
    const text = completion.choices[0]?.message?.content || '';
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('Application drafter error:', error);
    throw new Error('Failed to draft application. Please try again.');
  }
}

export async function checkCompliance(projectDescription: string, zipCode: string) {
  const prompt = `You are a building code compliance checker. Output ONLY valid JSON.

Project: ${projectDescription}
Zip: ${zipCode}

JSON format:
{"overallRisk":"Low|Medium|High","issues":[{"severity":"Low|Medium|High","code":"IRC R302.1","description":"...","recommendation":"..."}],"passedChecks":[{"check":"...","status":"Passed"}]}`;

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: 'You are a helpful assistant. Output only valid JSON, no markdown, no explanation.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });
    const text = completion.choices[0]?.message?.content || '';
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('Compliance check error:', error);
    throw new Error('Failed to check compliance. Please try again.');
  }
}

export async function generateDocumentChecklist(projectDescription: string, permitType: string) {
  const prompt = `You are a permit document checklist generator. Output ONLY valid JSON.

Project: ${projectDescription}
Permit: ${permitType}

JSON format:
[{"name":"document name","description":"what it needs","required":true,"tips":["tip1","tip2"]}]`;

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: 'You are a helpful assistant. Output only valid JSON, no markdown, no explanation.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });
    const text = completion.choices[0]?.message?.content || '';
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('Document checklist error:', error);
    throw new Error('Failed to generate checklist. Please try again.');
  }
}
