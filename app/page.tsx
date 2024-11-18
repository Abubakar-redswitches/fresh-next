import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getPosts,
  getCategoriesToShowOnBlog,
  getLatestBlogCategy,
  getLatestPostBlog,
  formatDate,
  formatExcerpt,
} from "@/actions/wp.actions";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface Post {
  id: number;
  slug: string;
  title: { rendered: string };
  featured_image_url: string;
  excerpt: { rendered: string };
  date: string;
  categories: { title: string }[];
}

const BlogSection = async () => {
  const latestPostData = await getPosts({ perPage: 1 });
  const latestPost = latestPostData.posts[0];

  const formattedDate = formatDate(latestPost.date);
  const excerpt = latestPost.excerpt.rendered;
  const truncatedExcerpt = formatExcerpt(excerpt, 180);

  const categories: Category[] = await getCategoriesToShowOnBlog(); // Add explicit type here

  const getLastetPostsCategory = await getLatestBlogCategy();
  const categoryIds = getLastetPostsCategory.map(
    (category: Category) => category.id
  );
  const posts: Post[] = await getLatestPostBlog(categoryIds);

  return (
    <>
      {/* Featured Article and Side Articles */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Featured Article */}
          <div className="lg:col-span-2">
            <div className="rounded-lg overflow-hidden">
              <Link href={`/blog/${latestPost.slug}`}>
                <Image
                  src={latestPost.featured_image_url} // replace with actual image path
                  alt="Featured Article"
                  width={800}
                  height={450}
                  priority
                  className="w-full h-auto object-cover"
                />
              </Link>
            </div>
            <div className="mt-4">
              <span className="text-[#7974B9] font-semibold">
                {latestPost.categories[0]?.title}
              </span>
              <span className="text-gray-500 ml-4">{formattedDate}</span>
              <h2 className="text-2xl font-bold mt-2 text-gray-900">
                {latestPost.title.rendered}
              </h2>
              <p className="text-gray-700 mt-2">{truncatedExcerpt}</p>
            </div>
          </div>

          {/* Right Column - Side Articles List */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="flex items-start space-x-4">
                <Image
                  src={post.featured_image_url} // replace with actual image path
                  alt={post.title["rendered"]}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <p className="text-blue-500 text-xs font-semibold uppercase">
                    {post.categories[0]?.title}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    <h3 className="text-gray-800 font-medium">
                      {post.title.rendered}
                    </h3>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="md:py-16 px-4">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id} // Use category.id instead of index as key
              className={`p-6 rounded-lg text-center ${
                index % 2 === 0 ? "bg-[#FBFBFB]" : "bg-[#FFF5EE]"
              }`}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {category.name}
              </h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <Link
                href={`/category/${category.slug}`} // Adjust the link to use the category slug
                className="text-blue-600 font-semibold hover:underline"
              >
                Learn more &gt;
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="bg-white md:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#090015] mb-4">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8">
            {posts.map((post) => {
              const latestFormattedDate = formatDate(post.date);
              return (
                <div
                  key={post.id}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Image
                      src={post.featured_image_url}
                      alt={post.title["rendered"]}
                      width={500}
                      height={300}
                      className="rounded-lg object-cover"
                    />
                  </Link>
                  <div className="mt-4">
                    <p className="text-blue-500 text-xs mb-1">
                      <span className="text-[#7974B9] font-semibold text-base">
                        {post.categories[0]?.title}
                      </span>
                      <span className="px-4 text-[#757B8A] text-base">
                        {latestFormattedDate}
                      </span>
                    </p>
                    <h3 className="text-lg font-semibold text-[#090015]">
                      {post.title["rendered"]}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSection;
