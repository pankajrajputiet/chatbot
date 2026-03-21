import { PROMPT_CATEGORIES } from "../constatnts/prompts";

export default function PromptPage({ onSelectPrompt }) {
  return (
    <div className="h-screen p-4 bg-gray-100 overflow-auto w-fit">
      <h2 className="font-bold text-lg mb-4">Prompts</h2>

      {Object.entries(PROMPT_CATEGORIES).map(([category, prompts]) => (
        <div key={category} className="mb-4">
          <h3 className="font-semibold capitalize mb-2">{category}</h3>

          {prompts.map((prompt, index) => (
            <div
              key={index}
              onClick={() => onSelectPrompt(prompt)}
              className="p-2 mb-1 bg-white rounded shadow cursor-pointer hover:bg-gray-200"
            >
              {prompt}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}