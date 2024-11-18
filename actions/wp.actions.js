export async function getPost(slug) {
  const res = await fetch(
    `https://api.talentino.ai/wp-json/wp/v2/posts?slug=${slug}`,
    {
      next: { revalidate: 60 },
    }
  );

  const data = await res.json();
  return data[0];
}

export async function getPosts({
  page = 1,
  perPage = 1,
  order = "desc",
  orderBy = "date",
  categories = [],
} = {}) {
  const categoryQuery = categories.length
    ? `&categories=${categories.join(",")}`
    : "";

  const res = await fetch(
    `https://api.talentino.ai/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}&order=${order}&orderby=${orderBy}${categoryQuery}`,
    {
      next: { revalidate: 60 },
    }
  );
  const posts = await res.json();
  return {
    posts,
  };
}

export async function getPostsByCategory(categoryId, { exclude, limit = 4 }) {
  const response = await fetch(
    `https://api.talentino.ai/wp-json/wp/v2/posts?categories=${categoryId}&exclude=${exclude}&per_page=${limit}`
  );
  const posts = await response.json();
  return posts;
}

export async function getCategoriesToShowOnBlog() {
  const response = await fetch(
    `https://api.talentino.ai/wp-json/wp/v2/categories`,
    {
      next: { revalidate: 60 },
    }
  );
  const categories = await response.json();
  return categories.filter(
    (category) => category.acf && category.acf.show_on_blog_page === true
  );
}

export async function getLatestBlogCategy() {
  const response = await fetch(
    `https://api.talentino.ai/wp-json/wp/v2/categories`,
    {
      next: { revalidate: 60 },
    }
  );
  const categories = await response.json();
  return categories.filter(
    (category) => category.acf && category.acf.latest_articles === true
  );
}

export async function getLatestPostBlog(categoryIds) {
  const categoryIdsParam = categoryIds.join(",");

  const response = await fetch(
    `https://api.talentino.ai/wp-json/wp/v2/posts?categories=${categoryIdsParam}`,
    {
      next: { revalidate: 60 },
    }
  );
  const posts = await response.json();
  return posts;
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
export function formatExcerpt(excerpt, maxLength = 150) {
  const plainTextExcerpt = excerpt.replace(/(<([^>]+)>)/gi, "");
  return plainTextExcerpt.length > maxLength
    ? plainTextExcerpt.substring(0, maxLength) + "..."
    : plainTextExcerpt;
}
