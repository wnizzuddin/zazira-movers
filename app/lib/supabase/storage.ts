import { createSupabaseClient } from "./client";

/**
 * Download JSON file from Supabase storage
 * @param bucketName - The storage bucket name
 * @param filePath - The path to the file in the bucket
 * @returns Parsed JSON data
 */
export async function downloadJsonFromStorage<T>(
  bucketName: string,
  filePath: string,
): Promise<T> {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.storage
      .from(bucketName)
      .download(filePath);

    if (error) {
      throw new Error(`Failed to download file: ${error.message}`);
    }

    if (!data) {
      throw new Error("No data received from storage");
    }

    // Convert Blob to text and parse as JSON
    const text = await data.text();
    const parsedData = JSON.parse(text) as T;

    return parsedData;
  } catch (error) {
    console.error("Error downloading JSON from storage:", error);
    throw error;
  }
}

/**
 * List all files in a storage bucket
 * @param bucketName - The storage bucket name
 * @param folderPath - Optional folder path within the bucket
 * @returns Array of file objects
 */
export async function listFilesInBucket(
  bucketName: string,
  folderPath: string = "",
) {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.storage
      .from(bucketName)
      .list(folderPath);

    if (error) {
      throw new Error(`Failed to list files: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error listing files in bucket:", error);
    throw error;
  }
}

/**
 * Get public URL for a file in storage
 * @param bucketName - The storage bucket name
 * @param filePath - The path to the file
 * @returns Public URL string
 */
export function getPublicFileUrl(bucketName: string, filePath: string): string {
  const supabase = createSupabaseClient();
  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

  return data.publicUrl;
}

/**
 * Download pricing data from storage
 * @param bucketName - The storage bucket name
 * @param fileName - The filename to download
 * @returns Parsed pricing data
 */
export async function getPackagePricingData(
  bucketName: string,
  filePath: string,
) {
  try {
    const supabase = createSupabaseClient();
    const { data } = await supabase.storage.from(bucketName).download(filePath);
    return data;
  } catch (error) {
    console.error("Error fetching package pricing data:", error);
    throw error;
  }
}

/**
 * Upload a file to Supabase storage
 * @param bucketName - The storage bucket name
 * @param filePath - The path where the file will be stored
 * @param file - The file to upload (File object)
 * @returns Upload response with path or error
 */
export async function uploadFileToStorage(
  bucketName: string,
  filePath: string,
  file: File,
) {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true, // Set to true to overwrite existing files
      });

    if (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error uploading file to storage:", error);
    throw error;
  }
}

/**
 * Upload or overwrite a file in Supabase storage
 * @param bucketName - The storage bucket name
 * @param filePath - The path where the file will be stored
 * @param file - The file to upload (File object)
 * @returns Upload response with path or error
 */
export async function upsertFileToStorage(
  bucketName: string,
  filePath: string,
  file: File,
) {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true, // Overwrites existing files
      });

    if (error) {
      throw new Error(`Failed to upsert file: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error upserting file to storage:", error);
    throw error;
  }
}
