import { Category } from "../../../../shared/types/Category";

export const selectConfig = {
  genres: {
    id: 'genres',
    type: 'text',
    label: 'Genre',
    multiple: true,
    excluded: false,
  },
  condition: {
    id: 'condition',
    type: 'text',
    label: 'Condition',
    multiple: false,
    excluded: false,
  },
  releaseYear: {
    id: 'releaseYear',
    type: 'text',
    label: 'Year',
    multiple: false,
    excluded: false,
  },
};

export const conditionOptions: Category[] = [
  {
    id: 'Like New',
    name: 'Like New',
  },
  {
    id: 'Very Good',
    name: 'Very Good',
  },
  {
    id: 'Good',
    name: 'Good',
  },
  {
    id: 'Poor',
    name: 'Poor',
  },
];