import styled from '@emotion/styled';
import * as React from 'react';
import { useMemo } from 'react';
import { Comment } from '../../services/comments';

export function getTimeDifferenceAsString(date: Date) {
  const currentDate = new Date();
  const seconds = Math.round((currentDate.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const months = Math.round(days / 30);

  switch (true) {
    case months >= 1:
      return months + ' months';
    case days >= 1:
      return days + ' days';
    case hours >= 1:
      return hours + ' hours';
    case minutes >= 1:
      return minutes + ' minutes';
    default:
      return seconds + ' seconds';
  }
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-content: start;
  margin: 1rem 0;
`;
const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-content: start;
  white-space: pre;
  margin-bottom: 0.3rem;
`;

const Header = styled(Row)`
  align-items: end;
`;

const ProfilePicture = styled.div<{ url: string }>`
  height: 3rem;
  width: 3rem;
  background-image: url(${(props) => props.url});
  background-origin: content-box;
  background-size: cover;
  border-radius: 9999px;
  margin: 0 1rem 0 0;
`;
const Name = styled.span`
  font-weight: 600;
  font-size: 1rem;
`;
const TimeStamp = styled.span`
  font-style: italic;
  font-size: 0.9rem;
  color: #aaa;
`;

const CommentComp: React.FC<{ comment: Comment }> = ({ comment: { profile, name, time, content } }) => {
  const timeDiff = useMemo(() => {
    if (time == null) return '';
    return getTimeDifferenceAsString(new Date(time)) + ' ago';
  }, [time]);

  return (
    <Row>
      <Column>
        <ProfilePicture url={profile!} />
      </Column>
      <Column>
        <Header>
          <Name>{name} </Name>
          <TimeStamp>{timeDiff}</TimeStamp>
        </Header>
        <Row>{content}</Row>
      </Column>
    </Row>
  );
};
export default CommentComp;
