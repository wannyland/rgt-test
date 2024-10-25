import { PageTitleWrapper } from "../Wrapper/index.styled";
import { Title } from "./index.styled";

interface Props {
  title: string;
}

const PageTitle = ({ title }: Props) => {
  return (
    <PageTitleWrapper>
      <Title>{title}</Title>
    </PageTitleWrapper>
  );
};
export default PageTitle;
