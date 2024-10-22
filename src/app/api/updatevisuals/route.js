import axios from "axios";

export async function handler(req, res) {
  if (req.method === "POST") {
    const { layoutData } = req.body;

    try {
      // Making the PUT request to Contentstack API to update the entry
      const response = await axios({
        method: "PUT",
        url: `https://eu-api.contentstack.com/v3/content_types/visuals/entries/bltda96d9fe6a336cc5`,
        headers: {
          api_key: process.env.CONTENTSTACK_API_KEY, // Your Contentstack API Key
          authorization: process.env.CONTENTSTACK_ACCESS_TOKEN, // Your Contentstack Access Token
          "content-type": "application/json",
        },
        data: {
          entry: {
            page_layout: layoutData, // The field you're updating with the new layout data
          },
        },
      });

      if (response.status === 200) {
        return res
          .status(200)
          .json({ message: "Layout updated successfully!" });
      } else {
        return res
          .status(response.status)
          .json({ message: "Failed to update layout." });
      }
    } catch (error) {
      console.error("Error updating layout:", error);
      return res
        .status(500)
        .json({ message: "Server error while updating layout." });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed. Use POST." });
  }
}
