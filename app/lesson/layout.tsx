// app/quiz/layout.tsx
export default function QuizLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen p-5">
        {children}
      </div>
    );
  }
  