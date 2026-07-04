import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const RecipeCard: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? '';
  const prepTime = (data.prepTime as string) ?? '';
  const cookTime = (data.cookTime as string) ?? '';
  const ingredients = (data.ingredients as string[]) ?? [];
  const steps = (data.steps as string[]) ?? [];
  const imageUrl = (data.imageUrl as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-10">
      <h1 className="text-base-content text-xl font-bold">{title}</h1>
      <div className="mt-2 flex gap-2">
        {prepTime && (
          <span className="rounded-box bg-accent/10 text-accent px-2.5 py-0.5 text-[10px] font-bold">
            Prep {prepTime}
          </span>
        )}
        {cookTime && (
          <span className="rounded-box bg-base-300 text-neutral px-2.5 py-0.5 text-[10px] font-bold">
            Cook {cookTime}
          </span>
        )}
      </div>
      {ingredients.length > 0 && (
        <div className="mt-4">
          <span className="text-neutral text-[10px] font-bold tracking-widest uppercase">
            Ingredients
          </span>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
            {ingredients.map((ing, i) => (
              <span key={i} className="text-base-content text-xs">
                • {ing}
              </span>
            ))}
          </div>
        </div>
      )}
      {steps.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          {steps.map((step, i) => (
            <p key={i} className="text-base-content text-xs leading-relaxed">
              <span className="text-accent font-bold">{i + 1}.</span> {step}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

RecipeCard.displayName = 'RecipeCard';
