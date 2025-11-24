import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateWorkoutPlan = async (apiKey, userContext) => {
    if (!apiKey) {
        throw new Error("API Key is missing");
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      You are an expert fitness coach (Sensei). Create a workout plan for me.
      
      My Profile:
      - Level: ${userContext.level || 1}
      - Goal: ${userContext.goal || "General Fitness"}
      - Recent Activity: ${userContext.recentWorkouts ? userContext.recentWorkouts.length : 0} workouts this week.
      
      You can include exercises from Strength, Calisthenics, Yoga, Cardio, or Flexibility.
      For Yoga/Cardio, use 'sets' as 1, 'reps' as 1, and 'weight' as duration in minutes (if applicable) or 0.
      
      Output strictly in JSON format with this structure:
      {
        "name": "Workout Name",
        "description": "Brief motivation",
        "exercises": [
          { "name": "Exercise Name", "sets": 3, "reps": 10, "weight": 20, "notes": "Form tip" }
        ]
      }
      
      Do not include markdown formatting like \`\`\`json. Just the raw JSON.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up if markdown is present despite instructions
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(cleanText);
    } catch (error) {
        console.error("AI Generation Error:", error);
        throw error;
    }
};

export const generateBossLore = async (apiKey, level) => {
    // Placeholder for future expansion
    return {
        name: "Iron Titan",
        description: "A colossus made of rusted plates and determination."
    };
};
