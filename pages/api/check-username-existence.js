//function to check if username already exist in database.
// so we let them two user have same username
import clientPromise from "@/app/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("scrt-pwd-data");
  const collection = db.collection("users");

  const { username } = req.body;

  if (req.method === "POST") {
    const data = await collection.findOne({
      username: username,
    });
    if (data === null) {
      return res.status(200).json({ isEligible: true });
    } else {
      return res.status(200).json({ isEligible: false });
    }
  }
  //return early when user type any username in input field
  return res
    .status(400)
    .json({ success: false, message: "method not allowed" });

  //return early when user not making a post request
}
