import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

function getCityFile(destination: string) {
  const lower = destination.toLowerCase();

  if (lower.includes("rome")) {
    return "rome.md";
  }

  if (lower.includes("paris")) {
    return "paris.md";
  }

  if (lower.includes("brasov") || lower.includes("brașov") || lower.includes("brășov")) {
    return "brasov.md";
  }

  return "";
}

async function readProjectFile(relativePath: string) {
  try {
    const fullPath = path.join(process.cwd(), relativePath);
    const content = await fs.readFile(fullPath, "utf8");

    return {
      found: true,
      content,
    };
  } catch {
    return {
      found: false,
      content: "",
    };
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const destination = url.searchParams.get("destination") || "Rome";

  const templateFile = "templates/trip-template.md";
  const cityFileName = getCityFile(destination);
  const cityProfileFile = cityFileName
    ? `city-profiles/${cityFileName}`
    : "city-profiles/[future-city].md";

  const template = await readProjectFile(templateFile);

  const cityProfile = cityFileName
    ? await readProjectFile(cityProfileFile)
    : {
        found: false,
        content:
          "No saved city profile exists yet for this destination. Create a new file in city-profiles using the same structure as city-profiles/rome.md.",
      };

  return NextResponse.json({
    destination,
    templateFile,
    cityProfileFile,
    templateFound: template.found,
    cityProfileFound: cityProfile.found,
    templateContent: template.content,
    cityProfileContent: cityProfile.content,
  });
}

