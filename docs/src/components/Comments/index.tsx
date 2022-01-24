/** @jsx jsx */
import styled from '@emotion/styled';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { Comment, CommentService } from '../../services/comments';
import CommentComp from './CommentComp';
import { css, jsx } from '@emotion/react';
import { useForm } from 'react-hook-form';

jsx; // no-op

const column = css`
  display: flex;
  flex-direction: column;
  justify-items: start;
  align-items: start;
  gap: 0.5rem;
`;
const row = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 0.25rem;
`;

const limit = 3;

const Button = styled.button`
  border: 0;
  color: white;
  font-weight: bold;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.75rem;
  background: #8257e6;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  &:hover {
    background-color: rgb(166, 135, 225);
  }

  &:active {
    background: #4e3293;
    box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  }

  &:disabled {
    background: #aaa;
  }
`;

const Container = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background-color: #eeeeee;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

const SeparatorLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: #9d9d9d;
  margin: 1rem 0;
`;
('mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md');

const fieldStyle = css`
  box-sizing: border-box;
  border-style: solid;
  appearance: none;
  background-color: #fff;
  border-width: 1px;
  padding: 0.5rem 0.75rem;
  display: block;
  width: 100%;
  border-color: rgb(107 114 128);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border-radius: 0.375rem;

  &:focus {
    border-color: #8257e6;
    outline-color: #8257e6;
  }
`;

const Field = styled.input`
  ${fieldStyle}
`;

const TextArea = styled.textarea`
  ${fieldStyle}
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 1rem;
`;

type Props = {
  article: string;
};
const Comments: React.FC<Props> = ({ article }) => {
  const [comments, setComments] = useImmer<Array<Comment>>([]);
  const [lastCursor, setLastCursor] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = useCallback(
    async (data) => {
      const res = await CommentService.postCommentsArticle(encodeURIComponent(article), data);
      setComments((draft) => [res, ...draft]);
      reset({ name: '', email: '', content: '' });
    },
    [article]
  );
  const loadNextBatch = useCallback(async () => {
    const res = await CommentService.getCommentsArticle(encodeURIComponent(article), limit, lastCursor!);
    setComments((draft) => [...draft, ...res.comments]);
    setLastCursor(res.cursor);
  }, [article, lastCursor]);

  // initial request
  useEffect(() => {
    async function getData() {
      const res = await CommentService.getCommentsArticle(encodeURIComponent(article), limit);
      setComments(res.comments);
      setLastCursor(res.cursor);
    }

    getData();
  }, [article]);
  return (
    <Container>
      <Title>Comments</Title>
      <form css={column} onSubmit={handleSubmit(onSubmit)}>
        <div css={row}>
          <Field type="text" {...register('name', { required: true })} placeholder="Name" />
          {errors.name && <span>This field is required</span>}
          <Field type="email" {...register('email', { required: true })} placeholder="Email" />
          {errors.email && <span>This field is required</span>}
        </div>
        <TextArea {...register('content', { required: true })} placeholder="Comment" />
        {errors.content && <span>This field is required</span>}
        <Button type="submit">Send</Button>
      </form>
      <SeparatorLine />
      {comments.map((comment) => (
        <CommentComp key={comment.id} comment={comment} />
      ))}
      {lastCursor != null ? <Button onClick={loadNextBatch}>Load More</Button> : null}
    </Container>
  );
};
export default Comments;
