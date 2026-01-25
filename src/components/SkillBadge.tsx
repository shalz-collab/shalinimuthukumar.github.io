interface SkillBadgeProps {
  skill: string;
}
const SkillBadge = ({
  skill
}: SkillBadgeProps) => {
  return <span className="skill-badge font-mono">{skill}</span>;
};
export default SkillBadge;