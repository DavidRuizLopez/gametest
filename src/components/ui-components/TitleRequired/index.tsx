import React from 'react';

interface TitleRequiredProps {
  id: string;
  title?: string;
  required?: boolean;
}
const TitleRequired = ({ id, title, required }: TitleRequiredProps) => {
  return (
    <>
      {title && (
        <label htmlFor={id} className="block font-semibold mb-2">
          {required ? (
            <abbr title="necesario" className="cursor-help">
              *
            </abbr>
          ) : (
            ''
          )}
          {title}
        </label>
      )}
    </>
  );
};

TitleRequired.displayName = 'TitleRequired';

export default TitleRequired;
