const HostURL = "http://hackathon-2023-bizai.as-in.io/v1";

const generateStory = async (body: object): Promise<string> => {
  const response = await fetch(`${HostURL}/generations/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data?.data || "";
}

export {
  generateStory
}