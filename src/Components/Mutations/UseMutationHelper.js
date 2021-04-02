import { useMutation } from "@apollo/client";

export default function useMutationHelper(mutation, {
  onCompletedFn,
  onErrorFn,
  refetchQueries
}) {
  console.log('I MUTATIONS')
  const [mutationFn, { error, loading, data,  }] = useMutation(mutation, {
    onCompleted(data) {
      onCompletedFn && onCompletedFn(data);
    },
    onError(error) {
      onErrorFn && onErrorFn(error);
      console.log(JSON.stringify("error", null, 2));
    },
    refetchQueries,
    awaitRefetchQueries: true
  });

  return {
    executeMutation: mutationFn,
    error,
    loading,
    data,
  };
}
