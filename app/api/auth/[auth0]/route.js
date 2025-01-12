import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";

const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL;

const afterCallback = async (req, session) => {
  try {
    if (!session || !session.user) {
      console.warn("No session or access token available");
      return session;
    }

    console.log("session.accessToken", session.accessToken);

    try {
      const response = await fetch(`${BACKEND_URL}/auth/sync-user`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Sync failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Backend sync response:", data);
    } catch (error) {
      console.error("Error syncing with backend:", error);
    }

    return session;
  } catch (error) {
    console.error("Error in afterCallback:", error);
    return session;
  }
};

export const GET = handleAuth({
  callback: handleCallback({ afterCallback }),
  onError: (err, req) => {
    console.error("Auth0 Error:", err);
    return new Response(
      JSON.stringify({
        error: "Authentication failed",
        details: err.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  },
});
