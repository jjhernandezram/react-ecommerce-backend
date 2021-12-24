export const pipeline = [
  { $lookup: { from: 'categories', localField: 'category', foreignField: '_id', as: 'category' } },
];
