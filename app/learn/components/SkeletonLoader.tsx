// app/learn/components/SkeletonLoader.tsx
export function LessonPathSkeleton() {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-8 bg-gray-200 rounded w-48"></div>
        </div>
  
        {/* Lesson Nodes Skeleton */}
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export function LearnPageSkeleton() {
    return (
      <div className="w-full">
        {/* Header Skeleton */}
        <div className="sticky top-0 z-50 bg-white border-b">
          <div className="h-[20px]"></div>
          <div className="h-16 px-4 flex items-center">
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>
  
        {/* Content Skeleton */}
        <div className="mt-10">
          <LessonPathSkeleton />
          <div className="mt-8">
            <LessonPathSkeleton />
          </div>
          <div className="mt-8">
            <LessonPathSkeleton />
          </div>
        </div>
      </div>
    );
  }