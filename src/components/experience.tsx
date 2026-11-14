import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { EXPERIENCES } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";

import "react-vertical-timeline-component/style.min.css";

type ExperienceCardProps = {
  experience: (typeof EXPERIENCES)[number];
};

// Experience Card
const ExperienceCard = ({ experience }: ExperienceCardProps) => (
  <VerticalTimelineElement
    contentStyle={{
      background: "#1d1836",
      color: "#fff",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.35)",
      borderRadius: "16px",
      border: "1px solid rgba(255, 255, 255, 0.08)",
    }}
    contentArrowStyle={{ borderRight: "7px solid #1d1836" }}
    date={experience.date}
    iconStyle={{
      background: experience.iconBg,
      color: "#fff",
      boxShadow: `0 0 20px ${experience.iconBg}99`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    icon={
      <div className="flex justify-center items-center w-full h-full text-white font-black text-[15px] sm:text-[17px] tracking-wider select-none font-sans">
        {experience.milestone}
      </div>
    }
  >
    {/* Title */}
    <div>
      <h3 className="text-white text-[22px] sm:text-[24px] font-bold">{experience.title}</h3>
      <p
        className="text-[#00cea8] text-[15px] sm:text-[16px] font-semibold tracking-wide"
        style={{ margin: 0 }}
      >
        {experience.company_name}
      </p>
    </div>

    {/* Experience Points */}
    <ul className="mt-5 list-disc ml-5 space-y-2.5">
      {experience.points.map((point, i) => (
        <li
          key={`experience-point-${i}`}
          className="text-white-100 text-[14px] pl-1 tracking-wider leading-relaxed"
        >
          {point}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

// Experience
export const Experience = () => {
  return (
    <SectionWrapper idName="work">
      <>
        {/* Title */}
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What I have done so far</p>
          <h2 className={styles.sectionHeadText}>Work Experience.</h2>
        </motion.div>

        {/* Experience Card */}
        <div className="mt-20 flex flex-col">
          <VerticalTimeline>
            {EXPERIENCES.map((experience, i) => (
              <ExperienceCard key={i} experience={experience} />
            ))}
          </VerticalTimeline>
        </div>
      </>
    </SectionWrapper>
  );
};
