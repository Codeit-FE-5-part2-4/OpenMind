const BASE_URL = "https://openmind-api.vercel.app/5-4";

// answers, questions, subject 일괄 삭제
export async function deleteAll(questions, id) {
  await deleteAnswers(questions);
  await deleteQuestions(questions);
  await deleteSubject(id);
}

// answers 삭제
export async function deleteAnswers(questions) {
  for (const question of questions) {
    await deleteSingleAnswer(question);
  }
}

// questions 삭제
async function deleteQuestions(questions) {
  for (const question of questions) {
    await deleteSingleQuestion(question);
  }
}

// subject 삭제
async function deleteSubject(subjectId) {
  try {
    await fetch(`${BASE_URL}/subjects/${subjectId}/`, {
      method: "DELETE",
    });
    console.log(`Subject ${subjectId} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting subject ${subjectId}: ${error}`);
  }
}

// 개별 question 삭제
export async function deleteSingleQuestion(question) {
  try {
    await fetch(`${BASE_URL}/questions/${question.id}/`, {
      method: "DELETE",
    });
    console.log(`Question ${question.id} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting question ${question.id}: ${error}`);
  }
}

//개별 answer 삭제
export async function deleteSingleAnswer(question) {
  if (question.answer !== null) {
    const answerId = question.answer.id;
    try {
      await fetch(`${BASE_URL}/answers/${answerId}/`, {
        method: "DELETE",
      });
      console.log(`Answer ${answerId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting answer ${answerId}: ${error}`);
    }
  }
}
