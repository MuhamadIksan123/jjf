'use client';

import Banner from './ComponentPage/banner';
import Section2 from './ComponentPage/section2';
import Highlight from './ComponentPage/highlight';
import HotNews from './ComponentPage/hotNews';
// import Section5 from './ComponentPage/section5';
import Blog from './ComponentPage/blog';
import Video from './ComponentPage/video';

export default function Home() {
  return (
    <div className="flex flex-col space-y-0 md:space-y-10">
      <section>
        <Banner />
      </section>
      <section>
        <Section2 />
      </section>
      <section className="px-4">
        <Highlight />
      </section>
      <section>
        <Video />
      </section>
      <section>
        <HotNews />
      </section>
      {/* <section>
        <Section5 />
      </section> */}
      <section>
        <Blog />
      </section>
    </div>
  );
}
