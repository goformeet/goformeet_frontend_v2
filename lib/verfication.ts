"use server";

export async function verifyDetails(
  approvalStatus: string,
  id: string | null,
  documentType: string | null,
  verificationType: string | null
) {
  console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}admin/approve-verification`);
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/approve-verification`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        approvalStatus: approvalStatus,
        documentType: documentType,
        verificationType: verificationType,
      }),
    };

    const response = await fetch(apiUrl, options);
    console.log(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Verification Updation Failed", error);
  }
}
