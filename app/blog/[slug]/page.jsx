import React from "react";
import { getPost, getPostsByCategory, formatDate } from "@/actions/wp.actions";
import Link from "next/link";
import Image from "next/image";

export async function generateStaticParams() {
  const res = await fetch("https://api.talentino.ai/wp-json/wp/v2/posts");
  const posts = await res.json();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }) {
  const slug = params.slug;
  const post = await getPost(slug);

  const relatedPosts =
    post.acf && Array.isArray(post.acf.you_may_also_like)
      ? post.acf.you_may_also_like
      : [];

  //console.log(relatedPosts)
  const authorInfo = post.author_info;
  const formattedDate = formatDate(post.date);

  const currentPostId = post.id;
  const currentCategoryId = post.categories?.[0].id;
  const latestPosts = currentCategoryId
    ? await getPostsByCategory(currentCategoryId, {
        exclude: currentPostId,
        limit: 4,
      })
    : [];

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <section className="max-w-[1236px] mx-auto flex gap-4 lg:flex-row flex-col px-6 mt-10">
        <main className="relative lg:max-w-[850px] bg-custom-bg border border-[#EAEAEA] rounded-[10px] sm:p-[50px] p-[25px] border-t-8 border-t-[#02d6e1]/60">
          <h1 className=" text-[#1c112f] md:text-[40px] text-[24px] font-bold md:leading-[46px] leading-[30px]">
            {post.title.rendered}
          </h1>
          <div className="mb-6 mt-5 pb-6 flex flex-col md:flex-row md:gap-0 gap-4 justify-between border-b border-[#e7effc]">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-[20px]">
                <Image
                  className="w-10 h-10 relative bg-white rounded-[50px] border border-[#cfcfd8] flex-col justify-start items-start flex"
                  src={authorInfo["avatar_url"]}
                  alt="Logo"
                  width={126}
                  height={24}
                  priority
                />
              </div>
              <div className="text-[#0e0b3d] text-base font-normal leading-relaxed">
                By {authorInfo["name"]}
              </div>
              <div className=" text-[#3c5885]/80 text-base font-normal leading-relaxed">
                {formattedDate}
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="text-[#3c5885]/80 text-base font-normal leading-relaxed">
                Share:
              </div>

              <div className="justify-center items-start gap-2.5 inline-flex">
                <Image
                  className="grow shrink basis-0 self-stretch bg-[#edeff3] rounded-full justify-center items-center inline-flex"
                  src="/twitter-blog.png"
                  alt="Logo"
                  width={30}
                  height={30}
                />
                <Image
                  className="grow shrink basis-0 self-stretch bg-[#edeff3] rounded-full justify-center items-center inline-flex"
                  src="/linkedin-blog.png"
                  alt="Logo"
                  width={30}
                  height={30}
                />
                <Image
                  className="grow shrink basis-0 self-stretch bg-[#edeff3] rounded-full justify-center items-center inline-flex"
                  src="/facebook-blog.png"
                  alt="Logo"
                  width={30}
                  height={30}
                />
              </div>
            </div>
          </div>
          <Image
            className="rounded-[10px] border mb-5"
            src={post.featured_image_url}
            alt="Featured Image"
            width={742}
            height={488}
          />

          <div
            className="text-lg font-normal leading-[29.16px] text-[#555466] post-content"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </main>
        <aside className="w-[365px]] lg:block flex flex-col gap-5">
          {relatedPosts.length > 0 && (
            <>
              <div className="h-[466px p-[31px] bg-custom-bg rounded-[10px] border border-[#eaeaea] flex flex-col justify-center">
                <div className="self-stretch h-[59px] pr-[101.86px] pt-[5px] pb-[25px] border-b border-[#e3ebfb] justify-start items-center inline-flex">
                  <div className="w-[201.14px] h-[29px] text-[#0e0b3d] text-2xl font-bold leading-10">
                    You may also like
                  </div>
                </div>

                {relatedPosts.map((related) => (
                  <div
                    key={related.id}
                    className="self-stretch h-20 pt-6 pb-2 justify-center items-center inline-flex"
                  >
                    <div className="grow shrink basis-0 h-12 pr-3.5 pt-px pb-0.5 justify-start items-center inline-flex">
                      <div className="w-[288.98px] h-[45px] text-[#0e0b3d] text-lg font-medium leading-normal">
                        <Link
                          className="hover:underline"
                          href={`/blog/${related.slug}`}
                        >
                          {related.title}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="w-[370px] h-60 relative bg-[#150425] rounded-[10px] lg:mt-6">
            <div className="h-60 bottom-0 right-0 top-[60px] absolute">
              <Image
                src="/Illustration.png"
                alt="illustration"
                width={193}
                height={193}
              />
            </div>
            <div className="pr-[102.45px] pb-[33px] left-[26px] top-[32px] absolute justify-start items-center inline-flex">
              <h3 className="w-[210.55px] h-[59px] text-white text-2xl font-bold leading-[30px]">
                Enter into the new Era of Hiring
              </h3>
            </div>
            <div className="w-[132.06px] h-[42px] pl-4 pr-[17.06px] pt-3 pb-[11.60px] left-[26px] top-[124px] absolute bg-[#02d6e1] rounded-md justify-center items-center inline-flex">
              <Link href="https://dev.talentino.ai/signin">
                <div className="w-[102px] h-[18.40px] text-center text-[#0b1325] text-base font-medium leading-tight">
                  Try Talentino
                </div>
              </Link>
            </div>
          </div>
        </aside>
      </section>
      <section className="py-16 px-4 lg:container mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#090015] mb-4">
          Related Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {latestPosts.map((latestPost) => {
            const relatedFormattedDate = formatDate(latestPost.date);

            return (
              <div
                key={latestPost.id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <Image
                  src={latestPost.featured_image_url} // replace with actual image path
                  alt={latestPost.title.rendered}
                  width={600}
                  height={300}
                  className="rounded-lg object-cover"
                />
                <div className="mt-4">
                  <div className="flex items-center gap-2 pb-2">
                    <Image
                      className="w-10 h-10 relative bg-white rounded-[50px] border border-[#cfcfd8] flex-col justify-start items-start flex"
                      src={latestPost.author_info["avatar_url"]}
                      alt="Logo"
                      width={126}
                      height={24}
                      priority
                    />
                    <p className="text-blue-500 text-xs mb-1 capitalize pt-2">
                      <span className="text-[#7974B9] text-base font-bold pr-10">
                        {latestPost.author_info["name"]}
                      </span>
                      {relatedFormattedDate}
                    </p>
                  </div>
                  <Link
                    className="hover:underline"
                    href={`/blog/${latestPost.slug}`}
                  >
                    <h3 className="text-lg font-semibold text-[#090015]">
                      {latestPost.title.rendered}
                    </h3>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
