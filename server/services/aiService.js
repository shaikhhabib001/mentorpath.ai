const axios = require('axios');

class AIService {
  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY;
    this.apiUrl = process.env.BASE_URL ||'https://api.openai.com/v1';
    this.fallbackEnabled = true;
  }

  async analyzeCV(cvText, targetRole = null) {
    const prompt = this.createCVAnalysisPrompt(cvText, targetRole);
    
    try {
      const response = await this.callOpenAI(prompt, 0.3, 1500);
      return this.parseCVAnalysisResponse(response);
    } catch (error) {
      console.error('AI CV Analysis Error:', error);
      
      if (this.fallbackEnabled) {
        return this.fallbackCVAnalysis(cvText);
      }
      
      throw new Error('CV analysis failed and fallback is disabled');
    }
  }

  async chatWithAI(message, conversationHistory = [], context = {}) {
    const messages = this.buildChatMessages(message, conversationHistory, context);
    
    try {
      const response = await this.callOpenAI(messages, 0.7, 500);
      return {
        response: response,
        tokens: response.usage?.total_tokens || 0
      };
    } catch (error) {
      console.error('AI Chat Error:', error);
      
      if (this.fallbackEnabled) {
        return {
          response: this.fallbackChatResponse(message, context),
          tokens: 0
        };
      }
      
      throw new Error('Chat failed and fallback is disabled');
    }
  }

  async extractSkillsFromText(text) {
    const prompt = `
      Extract technical and soft skills from the following text. Return ONLY a JSON array of skill objects with this structure:
      [
        {
          "name": "skill name",
          "category": "programming|framework|tool|language|soft|other",
          "confidence": number between 0-100,
          "years": number or null
        }
      ]
      
      Text: ${text.substring(0, 2000)}
    `;

    try {
      const response = await this.callOpenAI(prompt, 0.2, 500);
      return JSON.parse(response);
    } catch (error) {
      console.error('Skill extraction error:', error);
      return this.fallbackSkillExtraction(text);
    }
  }

  async generateInterviewQuestions(role, level = 'mid', count = 5) {
    const prompt = `
      Generate ${count} interview questions for a ${level} level ${role} position.
      Include a mix of technical, behavioral, and situational questions.
      Return as JSON:
      {
        "role": "${role}",
        "level": "${level}",
        "questions": [
          {
            "type": "technical|behavioral|situational",
            "question": "the question",
            "tips": ["tip1", "tip2"],
            "difficulty": "easy|medium|hard"
          }
        ]
      }
    `;

    try {
      const response = await this.callOpenAI(prompt, 0.5, 800);
      return JSON.parse(response);
    } catch (error) {
      console.error('Question generation error:', error);
      return this.fallbackInterviewQuestions(role, level, count);
    }
  }

  // Private methods
  createCVAnalysisPrompt(cvText, targetRole) {
    const roleContext = targetRole ? `Target role: ${targetRole}. ` : '';
    
    return `
      Analyze the following CV and provide a comprehensive analysis. ${roleContext}
      Return the analysis as JSON with this exact structure:
      
      {
        "skills": [
          {
            "name": "skill name",
            "category": "programming|framework|tool|language|soft|other",
            "confidence": number between 0-100,
            "years": number or null
          }
        ],
        "experience": {
          "totalYears": number,
          "roles": [
            {
              "title": "job title",
              "company": "company name",
              "duration": "time period",
              "years": number
            }
          ]
        },
        "education": [
          {
            "degree": "degree name",
            "institution": "institution name",
            "year": graduation year
          }
        ],
        "summary": "brief professional summary",
        "confidence": overall analysis confidence 0-100
      }
      
      CV Text: ${cvText.substring(0, 4000)}
    `;
  }

  buildChatMessages(message, history, context) {
    const systemMessage = {
      role: "system",
      content: this.createSystemPrompt(context)
    };

    const historyMessages = history.slice(-10).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    return [
      systemMessage,
      ...historyMessages,
      { role: "user", content: message }
    ];
  }

  createSystemPrompt(context) {
    const basePrompt = "You are an AI career mentor and interview coach. Help users prepare for job interviews by providing constructive feedback, answering career-related questions, and offering professional advice. Be supportive, encouraging, and provide actionable suggestions.";
    
    if (context.jobRole) {
      return `${basePrompt} The user is preparing for a ${context.jobRole} position.`;
    }
    
    if (context.interviewType) {
      return `${basePrompt} Focus on ${context.interviewType} interview questions.`;
    }
    
    return basePrompt;
  }

  async callOpenAI(messages, temperature, maxTokens) {
    if (!this.openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await axios.post(this.apiUrl, {
      model: "gemini-2.5-flash",
      messages: Array.isArray(messages) ? messages : [{ role: "user", content: messages }],
      temperature: temperature,
      max_tokens: maxTokens,
      response_format: { type: "json_object" }
    }, {
      headers: {
        'Authorization': `Bearer ${this.openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    return response.data.choices[0].message.content;
  }

  parseCVAnalysisResponse(response) {
    try {
      const analysis = JSON.parse(response);
      
      // Validate required fields
      if (!analysis.skills || !Array.isArray(analysis.skills)) {
        throw new Error('Invalid analysis response: skills array missing');
      }
      
      return analysis;
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      throw new Error('Invalid analysis response format');
    }
  }

  // Fallback methods
  fallbackCVAnalysis(cvText) {
    console.log('Using fallback CV analysis');
    
    // Simple keyword matching for common skills
    const commonSkills = {
      programming: ['JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Swift', 'Kotlin'],
      framework: ['React', 'Vue', 'Angular', 'Node.js', 'Express', 'Django', 'Spring', 'Laravel'],
      tool: ['Git', 'Docker', 'AWS', 'Azure', 'MongoDB', 'MySQL', 'PostgreSQL', 'Redis'],
      soft: ['Communication', 'Leadership', 'Teamwork', 'Problem Solving', 'Time Management']
    };

    const foundSkills = [];
    const text = cvText.toLowerCase();

    Object.entries(commonSkills).forEach(([category, skills]) => {
      skills.forEach(skill => {
        if (text.includes(skill.toLowerCase())) {
          foundSkills.push({
            name: skill,
            category: category,
            confidence: 70,
            years: null
          });
        }
      });
    });

    return {
      skills: foundSkills,
      experience: { totalYears: 0, roles: [] },
      education: [],
      summary: "Basic analysis completed using keyword matching.",
      confidence: 60
    };
  }

  fallbackChatResponse(message, context) {
    const responses = [
      "I understand you're looking for career advice. While I'm currently operating in fallback mode, I'd be happy to help with general interview preparation tips.",
      "That's an important question for interview preparation. A good approach is to focus on specific examples from your experience.",
      "For technical interviews, remember to explain your thought process clearly and consider edge cases in your solutions.",
      "Behavioral questions are best answered using the STAR method (Situation, Task, Action, Result)."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  fallbackSkillExtraction(text) {
    // Simple skill extraction fallback
    return [];
  }

  fallbackInterviewQuestions(role, level, count) {
    // Basic fallback questions
    const questions = [
      {
        type: "technical",
        question: `What are the key technical skills required for a ${role} role?`,
        tips: ["Focus on fundamental concepts", "Mention relevant technologies"],
        difficulty: "medium"
      },
      {
        type: "behavioral",
        question: "Tell me about a challenging project you worked on.",
        tips: ["Use the STAR method", "Focus on your contributions"],
        difficulty: "medium"
      }
    ];
    
    return {
      role: role,
      level: level,
      questions: questions.slice(0, count)
    };
  }
}

module.exports = new AIService();