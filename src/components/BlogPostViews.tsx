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
        fetch(`${import.meta.env.PUBLIC_API_URL}/views/${slug}`, {
          method: increment ? "POST" : "GET",
        })
          .then((res) => {
            console.log(res);
            return res.json();
          })
          .then((data) => {
            setViews(data.count);
          });
      }
    } catch (e) {
      console.error(e);
    }
  }, [inView]);

  return (
    <span
      className={className ? className : "capsize ml-2 align-baseline"}
      ref={ref}
    >
      Views: {views !== null ? formatViews(views) : "–––"}
    </span>
  );
};

export default BlogPostViews;
