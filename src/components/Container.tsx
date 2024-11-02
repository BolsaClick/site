interface ContainerProps {
  className?: string;
  children: React.ReactNode; 
}

const Container = ({ className, children }: ContainerProps) => {
  return (
    <div className={`container mx-auto max-w-[1216px] ${className}`}>
      {children}
    </div>
  );
};

export default Container;
