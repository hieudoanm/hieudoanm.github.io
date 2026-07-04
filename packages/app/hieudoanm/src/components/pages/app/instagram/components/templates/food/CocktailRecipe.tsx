import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const CocktailRecipe: FC<TemplateProps> = ({ data }) => {
  const name = (data.name as string) ?? '';
  const ingredients = (data.ingredients as string[]) ?? [];
  const instructions = (data.instructions as string) ?? '';
  const garnish = (data.garnish as string) ?? '';
  const glass = (data.glass as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-12">
      <h1 className="text-base-content text-2xl font-bold">{name}</h1>
      {glass && (
        <span className="rounded-box bg-accent/10 text-accent mt-2 inline-block self-start px-3 py-0.5 text-[10px] font-bold">
          {glass}
        </span>
      )}
      <div className="mt-5">
        <span className="text-neutral text-[10px] font-bold tracking-widest uppercase">
          Ingredients
        </span>
        <div className="mt-2 flex flex-col gap-1">
          {ingredients.map((ing, i) => (
            <p key={i} className="text-base-content text-sm">
              • {ing}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <span className="text-neutral text-[10px] font-bold tracking-widest uppercase">
          Method
        </span>
        <p className="text-base-content mt-1 text-xs leading-relaxed">
          {instructions}
        </p>
      </div>
      {garnish && (
        <p className="text-neutral mt-3 text-xs">Garnish: {garnish}</p>
      )}
    </div>
  );
};

CocktailRecipe.displayName = 'CocktailRecipe';
