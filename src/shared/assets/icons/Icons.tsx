export const MinusIcon = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 24H38"
        stroke="#1E1E1E"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const PlusIcon = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 10V38M10 24H38"
        stroke="#1E1E1E"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LoaderIcon = ({ fill = 'white' }: { fill?: string }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill={fill}
        id="Base"
        d="M19 10C19.5523 10 20.0052 10.4488 19.95 10.9984C19.7738 12.7549 19.1348 14.44 18.0902 15.8779C16.8489 17.5863 15.0986 18.858 13.0902 19.5106C11.0817 20.1631 8.91826 20.1631 6.90983 19.5106C4.9014 18.858 3.15111 17.5863 1.90983 15.8779C0.668549 14.1694 -1.84619e-07 12.1118 0 10C1.84619e-07 7.88821 0.66855 5.83062 1.90983 4.12215C3.15111 2.41367 4.9014 1.14201 6.90983 0.489434C8.6001 -0.0597676 10.4002 -0.146768 12.1252 0.228432C12.6649 0.345809 12.9518 0.915238 12.7812 1.44049C12.6105 1.96575 12.0467 2.24653 11.5042 2.14268C10.1843 1.88999 8.81621 1.97294 7.52786 2.39155C5.92112 2.91361 4.52089 3.93094 3.52786 5.29772C2.53484 6.6645 2 8.31056 2 10C2 11.6894 2.53484 13.3355 3.52786 14.7023C4.52089 16.0691 5.92112 17.0864 7.52786 17.6085C9.13461 18.1305 10.8654 18.1305 12.4721 17.6085C14.0789 17.0864 15.4791 16.0691 16.4721 14.7023C17.2684 13.6064 17.77 12.3309 17.9376 10.9974C18.0064 10.4495 18.4477 10 19 10Z"
      />
    </svg>
  );
};

export const CloseIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
        fill="#1D1B20"
      />
    </svg>
  );
};
