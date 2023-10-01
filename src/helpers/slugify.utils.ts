const slugify = (input: string): string => {
  const slug = input.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return slug.replace(/^-+|-+$/g, "");
};

export default slugify;
