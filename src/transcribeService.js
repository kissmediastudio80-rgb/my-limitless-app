// src/transcribeService.js
// 100% Limit-free — Completely decoupled from Base44 servers

const BACKEND_URL = 'https://private-caption-backend.onrender.com';

 // Points straight to your backend terminal port

export async function transcribeToThai(url, setTranscribeStep) {
  try {
    setTranscribeStep(0); // Initiating link validation...
    
    const response = await fetch(`${BACKEND_URL}/api/transcribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const errorPayload = await response.json();
      throw new Error(errorPayload.error || "The private caption engine failed.");
    }

    setTranscribeStep(1); // Timeline mapping...
    const dataMatrix = await response.json();
    
    setTranscribeStep(2); // Injecting synchronized timeline blocks...
    return {
      title: dataMatrix.title || "Independent Transcript Stream",
      segments: dataMatrix.segments || []
    };
  } catch (error) {
    console.error("Local network pipeline processing exception:", error);
    return { title: "", segments: [] };
  }
}
