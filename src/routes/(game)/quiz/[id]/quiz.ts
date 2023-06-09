import { error } from '@sveltejs/kit';

import Quiz from '$data/quiz.json';

function getQuizIndex(id: string) {
  if (id === 'A') return 0;
  if (id === 'B') return 1;
  if (id === 'C') return 2;

  throw error(500, 'Internal Server Error');
}

export function getQuizById(id: string) {
  return Quiz[getQuizIndex(id)];
}

export function getClientQuiz(id: string) {
  const quiz = getQuizById(id);

  const processedQuestion = quiz.questions.map((q) => {
    const choices = [q.correct, ...q.wrong].sort(() => Math.random() - 0.5);
    return {
      question: q.question,
      choices,
    };
  });

  return {
    name: quiz.name,
    description: quiz.description,
    questions: processedQuestion,
  };
}

export async function hashAnswer(answer: string[]) {
  const str = answer.join('__SECRET_SEP__');

  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(str)
  );

  return Array.prototype.map
    .call(new Uint8Array(buf), (x) => ('00' + x.toString(16)).slice(-2))
    .join('');
}
