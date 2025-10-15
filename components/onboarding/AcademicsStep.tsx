import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface AcademicsFormData {
  gpa: number | undefined;
  gpaScale: string;
  classRank?: string;
  classSize?: number | undefined;
  satScore?: number | undefined;
  actScore?: number | undefined;
  apCourses?: { name: string; score?: number }[];
  honorsCourses?: string[];
  academicAwards?: string;
}

interface AcademicsStepProps {
  onNext: (data: AcademicsFormData) => void;
  onBack: () => void;
  initialData?: Partial<AcademicsFormData>;
}

const schema = yup.object().shape({
  gpa: yup.number().min(0).max(5, 'GPA cannot exceed 5.0').required('GPA is required'),
  gpaScale: yup.string().required('GPA scale is required'),
  classRank: yup.string(),
  classSize: yup.number().when('classRank', {
    is: (val: string) => val && val.length > 0,
    then: (schema) => schema.positive('Class size must be positive').required('Class size is required when providing class rank'),
    otherwise: (schema) => schema,
  }),
  satScore: yup.number().min(400).max(1600, 'SAT score cannot exceed 1600'),
  actScore: yup.number().min(1).max(36, 'ACT score cannot exceed 36'),
  apCourses: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Course name is required'),
      score: yup.number().min(1).max(5, 'AP score must be between 1-5'),
    })
  ),
  honorsCourses: yup.array().of(yup.string().required('Course name is required')),
  academicAwards: yup.string(),
});

const GPA_SCALES = [
  { value: '4.0', label: '4.0 Scale' },
  { value: '5.0', label: '5.0 Scale' },
  { value: '100', label: '100 Point Scale' },
  { value: 'other', label: 'Other' },
];

const AcademicsStep: React.FC<AcademicsStepProps> = ({ onNext, onBack, initialData = {} }) => {
  const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gpa: undefined,
      gpaScale: '4.0',
      classRank: '',
      classSize: undefined,
      satScore: undefined,
      actScore: undefined,
      apCourses: [{ name: '', score: undefined }],
      honorsCourses: [''],
      academicAwards: '',
      ...initialData
    }
  });

  const watchClassRank = watch('classRank');
  const watchApCourses = watch('apCourses');
  const watchHonorsCourses = watch('honorsCourses');

  const addApCourse = () => {
    setValue('apCourses', [...(watchApCourses || []), { name: '', score: undefined }]);
  };

  const removeApCourse = (index: number) => {
    const updated = [...(watchApCourses || [])];
    updated.splice(index, 1);
    setValue('apCourses', updated);
  };

  const addHonorsCourse = () => {
    setValue('honorsCourses', [...(watchHonorsCourses || []), '']);
  };

  const removeHonorsCourse = (index: number) => {
    const updated = [...(watchHonorsCourses || [])];
    updated.splice(index, 1);
    setValue('honorsCourses', updated);
  };

  const onSubmit = (data: AcademicsFormData) => {
    onNext(data);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Academic Information</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* GPA Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
            <Controller
              name="gpa"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  step="0.01"
                  className={`w-full p-2 border rounded ${errors.gpa ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter GPA"
                  {...field}
                />
              )}
            />
            {errors.gpa && <p className="mt-1 text-sm text-red-600">{errors.gpa.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GPA Scale</label>
            <Controller
              name="gpaScale"
              control={control}
              render={({ field }) => (
                <select className="w-full p-2 border border-gray-300 rounded" {...field}>
                  {GPA_SCALES.map(scale => (
                    <option key={scale.value} value={scale.value}>
                      {scale.label}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
        </div>

        {/* Class Rank Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class Rank (optional)</label>
            <Controller
              name="classRank"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="e.g., 10th"
                  {...field}
                />
              )}
            />
          </div>
          
          {watchClassRank && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class Size</label>
              <Controller
                name="classSize"
                control={control}
                render={({ field }) => (
                  <input
                    type="number"
                    className={`w-full p-2 border rounded ${errors.classSize ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter class size"
                    {...field}
                  />
                )}
              />
              {errors.classSize && <p className="mt-1 text-sm text-red-600">{errors.classSize.message}</p>}
            </div>
          )}
        </div>

        {/* Test Scores Section */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Standardized Test Scores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SAT Score (optional)</label>
              <Controller
                name="satScore"
                control={control}
                render={({ field }) => (
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="400-1600"
                    min={400}
                    max={1600}
                    {...field}
                  />
                )}
              />
              {errors.satScore && <p className="mt-1 text-sm text-red-600">{errors.satScore.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ACT Score (optional)</label>
              <Controller
                name="actScore"
                control={control}
                render={({ field }) => (
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="1-36"
                    min={1}
                    max={36}
                    {...field}
                  />
                )}
              />
              {errors.actScore && <p className="mt-1 text-sm text-red-600">{errors.actScore.message}</p>}
            </div>
          </div>
        </div>

        {/* AP Courses Section */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">AP Courses & Scores</h3>
            <button
              type="button"
              onClick={addApCourse}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              + Add AP Course
            </button>
          </div>
          
          {(watchApCourses || []).map((course: { name: string; score?: number }, index: number) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 items-end">
              <div className="md:col-span-7">
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                <Controller
                  name={`apCourses.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="e.g., AP Calculus BC"
                      {...field}
                    />
                  )}
                />
                {errors.apCourses?.[index]?.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.apCourses[index].name.message}</p>
                )}
              </div>
              
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Score (1-5)</label>
                <Controller
                  name={`apCourses.${index}.score`}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="number"
                      min={1}
                      max={5}
                      className="w-full p-2 border border-gray-300 rounded"
                      {...field}
                    />
                  )}
                />
                {errors.apCourses?.[index]?.score && (
                  <p className="mt-1 text-sm text-red-600">{errors.apCourses[index].score.message}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={() => removeApCourse(index)}
                  className="w-full py-2 px-3 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Honors Courses Section */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Honors/Advanced Courses</h3>
            <button
              type="button"
              onClick={addHonorsCourse}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              + Add Course
            </button>
          </div>
          
          {(watchHonorsCourses || []).map((course: string, index: number) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 items-end">
              <div className="md:col-span-10">
                <Controller
                  name={`honorsCourses.${index}`}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="e.g., Honors Chemistry"
                      {...field}
                    />
                  )}
                />
                {errors.honorsCourses?.[index] && (
                  <p className="mt-1 text-sm text-red-600">{errors.honorsCourses[index].message}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                {(watchHonorsCourses || []).length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeHonorsCourse(index)}
                    className="w-full py-2 px-3 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Academic Awards Section */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Academic Awards & Achievements</h3>
          <Controller
            name="academicAwards"
            control={control}
            render={({ field }) => (
              <textarea
                className="w-full p-2 border border-gray-300 rounded h-24"
                placeholder="List any academic honors, awards, or achievements"
                {...field}
              />
            )}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default AcademicsStep;
