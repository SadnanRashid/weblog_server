const paginator = (query: { page: string; limit: string }) => {
  const { page, limit } = query;
  const pageN = parseInt(page);
  const limitN = parseInt(limit);
  return { page: pageN, limit: limitN, skip: limitN * pageN };
};

export { paginator };
