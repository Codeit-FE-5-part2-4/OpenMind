const BASE_URL = "https://openmind-api.vercel.app/5-4";

export default async function deleteFeed(questions, id) {
  await deleteAnswers(questions);
  await deleteQuestions(questions);
  await deleteSubject(id);
}

async function deleteAnswers(questions) {
  for (const question of questions) {
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
}

async function deleteQuestions(questions) {
  for (const question of questions) {
    try {
      await fetch(`${BASE_URL}/questions/${question.id}/`, {
        method: "DELETE",
      });
      console.log(`Question ${question.id} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting question ${question.id}: ${error}`);
    }
  }
}

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
