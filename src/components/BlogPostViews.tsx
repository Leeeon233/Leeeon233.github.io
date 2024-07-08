import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export const formatViews = (views: number) => {
  return new Intl.NumberFormat("en-US").format(views);
};

const BlogPostViews = ({
  slug,
  className,
  increment,
}: {
  slug: string;
  className?: string;
  increment?: boolean;
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const [views, setViews] = useState<number | null>(null);
  useEffect(() => {
    try {
      if (inView) {
        console.log(
          "fetching views",
          `${import.meta.env.PUBLIC_API_URL}/views/${slug}`
        );

        fetch(`${import.meta.env.PUBLIC_API_URL}/views/${slug}`, {
          method: increment ? "POST" : "GET",
        })
          .then(res => {
            console.log("res", res);

            return res.json();
          })
          .then(data => {
            setViews(data.count);
          });
      }
    } catch (e) {
      console.log(e);
    }
  }, [inView]);

  return (
    <span
      className={className ? className : "capsize ml-2 align-baseline"}
      ref={ref}
    >
      Views: {views ? formatViews(views) : "–––"}
    </span>
  );
};

export default BlogPostViews;
