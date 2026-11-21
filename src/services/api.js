const API_URL = "http://127.0.0.1:5000";

export async function getDetection(file = null) {

    if (file) {

        const formData = new FormData();

        formData.append("image", file);

        const response = await fetch("http://127.0.0.1:5000/detect", {
            method: "POST",
            body: formData,
        });

        return await response.json();
    }

    const response = await fetch("http://127.0.0.1:5000/detect");

    return await response.json();
}