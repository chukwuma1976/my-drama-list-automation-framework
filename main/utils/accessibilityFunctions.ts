import AxeBuilder from "@axe-core/playwright";
import { Page } from "@playwright/test";

export function logAccessibilityScanResults(typeOfPage: string, descriptions: string[]) {
    console.log(`Accessibility scan recommendations for ${typeOfPage}\n`);
    descriptions.forEach((description, index) => console.log(`\t ${index + 1}) ${description}`));
}

export async function getAccessibilityScanViolations(page: Page): Promise<string[]> {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    const descriptions = accessibilityScanResults.violations.map(violation => violation.description);
    return descriptions;
}