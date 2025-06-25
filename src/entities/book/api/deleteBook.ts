import { config } from "@/shared/config";

export interface DeleteBookRequest {
  id: string;
}

export async function deleteBook(
  request: DeleteBookRequest
): Promise<void> {
  try {
    const response = await fetch(`${config.backendUrl}/books/${request.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    localStorage.getItem(`currentlyReading`);
    const currentlyReading = JSON.parse(
      localStorage.getItem("currentlyReading") ?? "{}"
    );
    delete currentlyReading[request.id];
    localStorage.setItem("currentlyReading", JSON.stringify(currentlyReading));

  } catch (error) {
    console.error("Failed to delete book:", error);
    throw error; // Re-throw the error for further handling
  }
}
