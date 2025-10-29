// Course image mapping utility
let courseMapping: Record<string, CourseImageData> = {};

// Safely import the course mapping
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  courseMapping = require('../../course_image_mapping_simple.json') as Record<string, CourseImageData>;
} catch (error) {
  console.warn('Failed to load course mapping:', error);
  courseMapping = {};
}

export interface CourseImageData {
  imageUrl: string;
  thumbUrl: string;
  photographer: string;
  category: string;
  fallbackSearch: string;
}

export const getCourseImage = (courseName: string): CourseImageData | null => {
  try {
    if (!courseName || typeof courseName !== 'string') {
      return null;
    }
    return courseMapping[courseName] || null;
  } catch (error) {
    console.warn('Error getting course image for:', courseName, error);
    return null;
  }
};

export const getRandomCourseImage = (category?: string): CourseImageData => {
  try {
    const courses = Object.values(courseMapping);
    
    if (courses.length === 0) {
      // Fallback image if no courses are loaded
      return {
        imageUrl: '/us-cources.png',
        thumbUrl: '/us-cources.png',
        photographer: 'Unknown',
        category: 'general',
        fallbackSearch: 'education'
      };
    }
    
    if (category) {
      const categoryFiltered = courses.filter((course: CourseImageData) => course.category === category);
      if (categoryFiltered.length > 0) {
        return categoryFiltered[Math.floor(Math.random() * categoryFiltered.length)];
      }
    }
    
    return courses[Math.floor(Math.random() * courses.length)] as CourseImageData;
  } catch (error) {
    console.warn('Error getting random course image:', error);
    // Fallback image
    return {
      imageUrl: '/us-cources.png',
      thumbUrl: '/us-cources.png',
      photographer: 'Unknown',
      category: 'general',
      fallbackSearch: 'education'
    };
  }
};

export const getAllCourseNames = (): string[] => {
  return Object.keys(courseMapping);
};

export const getCoursesByCategory = (category: string): { [key: string]: CourseImageData } => {
  const filtered: { [key: string]: CourseImageData } = {};
  
  Object.entries(courseMapping).forEach(([courseName, courseData]) => {
    if (courseData.category === category) {
      filtered[courseName] = courseData;
    }
  });
  
  return filtered;
};

export default courseMapping;