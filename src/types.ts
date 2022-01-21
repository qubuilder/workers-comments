export type Comment = {
  name: string;
  email: string;
  content: string;
};

export type ResponseComment = {
  id: string;
  profile: string;
  time: string;
} & Omit<Comment, 'email'>;

export type StoredComment = {
  user_ip: string;
  user_agent: string;
  referrer: string;
  profile: string;
  time: number;
} & Comment;

export type GetResponse = {
  comments: Array<ResponseComment>;
  cursor: string | null;
};
