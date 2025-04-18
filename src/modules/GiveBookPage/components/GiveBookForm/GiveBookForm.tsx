import cn from 'classnames';
import styles from './GiveBookForm.module.scss';
import { FormInput } from '../../../../shared/components/FormInput';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Book, BookData } from '../../../../shared/types/Book';
import { Category } from '../../../../shared/types/Category';
import { SelectInput } from '../SelectInput';
import { conditionOptions, formatOptions } from '../SelectInput/config';
import { Loader } from '../../../../shared/components/Loader';
import { DescriptionInput } from '../DescriptionInput';
import plusIcon from '@assets/icons/plus.svg';
import deleteIcon from '@assets/icons/delete.svg';
import { useAppSelector } from '../../../../shared/hooks/storeHooks';
import { PrimaryButton } from '../../../../shared/components/PrimaryButton';
import { SecondaryButton } from '../../../../shared/components/SecondaryButton';
import { bookService } from '../../../../services/bookService';

interface Props {
  book?: Book;
  complete: () => void;
}

const keys: (keyof Book)[] = ['title', 'author', 'genres', 'condition', 'format', 'description'];

interface FormDataType {
  title: string;
  titleError: string;
  author: string;
  authorError: string;
  genres: string[];
  genresError: string;
  condition: string;
  conditionError: string;
  format: string;
  formatError: string;
  releaseYear: string;
  releaseYearError: string;
  description: string;
  image: File | null;
  imageError: string;
}

const initialFormData: FormDataType = {
  title: '',
  titleError: '',
  author: '',
  authorError: '',
  genres: [],
  genresError: '',
  condition: '',
  conditionError: '',
  format: '',
  formatError: '',
  releaseYear: '',
  releaseYearError: '',
  description: '',
  image: null,
  imageError: '',
}

export const GiveBookForm: React.FC<Props> = ({ book, complete }) => {

  const [submitting, setSubmitting] = useState(false);

  // CURRENT YEAR for Year select
  const currentYear = useMemo(() => {
    return new Date().getFullYear()
  }, []);

  // YEAR OPTIONS for select
  const years = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => currentYear - i)
      .map(year => {
        return {
          id: year,
          name: `${year}`,
        } as Category;
      });
  }, [currentYear]);


  // if adding NEW book, form data is blank
  // if editting EXISTING book, form data is taken from book
  const initFormData = useCallback(() => {
    if (!book) {
      return initialFormData;
    }

    const existingFields = Object.fromEntries(
      keys.map(key => [key, book[key] || ''])
    );

    const errorFields = Object.fromEntries(
      Object.entries(initialFormData)
        .filter(([key]) => key.includes('Error'))
    );

    return {
      ...existingFields,
      ...errorFields,
    } as FormDataType;
  }, [book])

  // FORM DATA state
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormDataType>(initFormData());
  const [imageFilename, setImageFilename] = useState('No file chosen');
  const { filters, loaded } = useAppSelector(state => state.filters);
  const genres = useMemo(() => filters.genres.values, [filters])

  // GENRE COUNT state
  const [genreCount, setGenreCount] = useState(0);
  const [genreIndices, setGenreIndices] = useState<number[]>([])

  // Update Form helper
  const updateForm = useCallback((newFields: Partial<FormDataType>) => {    
    setFormData(prevData => {
      return {
        ...prevData,
        ...newFields,
      };
    })
  }, []);

  // Update text input helper
  const updateInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;

    if (input) {
      const key = input.name as keyof FormDataType;

      updateForm({ 
        [key]: input.value,
        [`${key}Error`]: '',
      });
    }
  }, [updateForm]);

  // Update textarea helper
  const updateTextArea = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target;

    if (input) {
      const key = input.name as keyof FormDataType;

      updateForm({ 
        [key]: input.value,
        [`${key}Error`]: '',
       });
    }
  }, [updateForm]);

  // HANDLE selection
  const handleSelect = (arg: string, value: string, inputNumber: number = 0) => {
    const key = arg as keyof FormDataType;

    if (arg === 'genres') {
      const index = genreIndices.indexOf(inputNumber);
      const arr = Array.from(formData.genres);
      arr[index] = value;

      updateForm({ [key]: arr });

      return;
    }

    updateForm({ [key]: value });
  }

  // FORM VALIDATION
  const validateForm = () => {
    // checklist for errors
    const errors = {
      titleError: '',
      authorError: '',
      genresError: '',
      conditionError: '',
      formatError: '',
      releaseYearError: '', 
      imageError: '', 
    }

    if (!formData.author) {
      errors.authorError = 'Book author cannot be empty';
    }

    if (!formData.title) {
      errors.titleError = 'Book title cannot be empty';
    }

    if (formData.genres.length < 1) {
      errors.genresError = 'Please select at least one genre for the book';
    }

    if (!formData.condition) {
      errors.conditionError = 'Please select condition of the book';
    }

    if (!formData.format) {
      errors.formatError = 'Please select format of the book';
    }

    if (!formData.releaseYear) {
      errors.releaseYearError = 'Please select the release year of the book';
    }

    if (!formData.image) {
      errors.imageError = 'Please add image for the book';
    }

    if (formData.image) {
      const filename = formData.image.name;

      if (!filename.endsWith('.png')) {
        errors.imageError = 'Only PNG images are acceptable';
      }
    }

    // check if all errors are empty
    const validated = Object.values(errors).every(value => !value);

    console.log('validated', validated, errors);
  

    // if not, update errors in form
    if (!validated) {
      updateForm(errors);
    }

    // return validation result
    return validated;
  }

  const getGehnreIdByName = (name: string) => {
    const id = genres.find(item => item.name === name)?.id;

    if (id) {
      return id as number;
    };

    return 0;
  };

  // SUBMIT a form
  const handleSubmit = (e: React.FormEvent) => {
    // avoid standard submit
    e.preventDefault();
    // show loader
    setSubmitting(true);

    // validate form data
    if (validateForm()) {
      const newBook: BookData = {
        author: formData.author,
        title: formData.title,
        genreIds: formData.genres.map(getGehnreIdByName),
        condition: formData.condition,
        format: formData.format,
        releaseYear: +formData.releaseYear,
        description: formData.description,
      }

      // if validated post a book (without image)
      bookService.postBook(newBook)
        .then(res => {
          // retrieve book id for adding image later on
          const bookId = res.id;

          // retrieve image
          const image = formData.image;

          if (image) {
            // add image to the book
            bookService.addImage(bookId, image)
              .then(() => {
                console.log(`Image added succesfully to book with id ${bookId}`);
              })
              .catch((error) => {
                console.log(error);
              })
              .finally(() => {
                // clear form, since book has been added
                updateForm(initialFormData);
              })
          }

          // replace form with confirmation
          complete();
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          // remove loader
          setSubmitting(false);
        })
    }
  }

  // Add new input on genreCount change
  useEffect(() => {
    const newIndex = genreCount;

    setGenreIndices(prev => {
      return [
        ...prev,
        newIndex,
      ];
    });
  }, [genreCount]);

  // Remove Genre input with particular index value
  const deleteGenreInput = useCallback((value: number) => {
    setGenreIndices(prev => prev.filter(
      num => num !== value
    ));
  }, []);

  // Update form on image selection
  const fileChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    // check if file has been added
    const file = e.target.files?.[0];

    if (file) {
      const filename = file.name;

      // update formdata
      updateForm({ 
        image: file,
        imageError: '',
       });

      // update filename for input
      setImageFilename(filename);
    }
  }

  return (
    <>
      {submitting || !loaded && <Loader />}

      <form className={styles.form} onSubmit={handleSubmit} ref={formRef} >
        <h3 className={styles.formTitle}>Book Information</h3>

        <div className={cn(styles.names, styles.formGrid)}>
          <FormInput
            configKey="bookTitle"
            value={formData.title}
            error={formData.titleError}
            onChange={updateInput}
          />

          <FormInput
            configKey="bookAuthor"
            value={formData.author}
            error={formData.authorError}
            onChange={updateInput}
          />
        </div>

        <div className={cn(styles.categories, styles.formGrid)}>
          <div className={cn(styles.genres, styles.formGrid)}>
            {genreIndices.map(index => {
              const i = genreIndices.indexOf(index);

              return (
                <div className={styles.genre} key={index} >
                  <SelectInput
                    configKey='genres'
                    options={genres}
                    value={formData.genres[i]}
                    error={formData.genresError}
                    onSelect={handleSelect}
                    index={index}
                  />

                  {i !== 0 ? (
                    <img
                      src={deleteIcon}
                      alt="bin icon"
                      className={styles.icon}
                      onClick={() => deleteGenreInput(index)}
                    />
                  ) : (
                    <img
                      src={plusIcon}
                      alt="plus icon"
                      className={styles.icon}
                      onClick={() => setGenreCount(prev => prev + 1)}
                    />
                  )}
                </div>
            )})}
          </div>

          <div className={cn(styles.category)}>
            <SelectInput
              configKey='condition'
              options={conditionOptions}
              value={formData.condition}
              error={formData.conditionError}
              onSelect={handleSelect}
            />
          </div>

          <div className={cn(styles.category)}>
            <SelectInput
              configKey='format'
              options={formatOptions}
              value={formData.format}
              error={formData.formatError}
              onSelect={handleSelect}
            />
          </div>

          <div className={cn(styles.category)}>
            <SelectInput
              configKey='releaseYear'
              options={years}
              value={formData.releaseYear}
              error={formData.releaseYearError}
              onSelect={handleSelect}
            />
          </div>

          <div className={styles.fileBlock}>
            <div className={styles.fileInputBlock}>
              <input type="file" id="file" className={styles.fileInput} multiple={false} onChange={fileChangeEvent} />
              <label htmlFor="file" className={styles.fileLabel}>Choose file</label>
              <span className={styles.fileName} id="file-name">{imageFilename}</span>
            </div>
            <p className={cn(styles.message, {
              [styles.errorMessage]: formData.imageError,
            })}>
              {formData.imageError}
            </p>
          </div>
        </div>

        <div className={styles.descriptionContainer}>
          <DescriptionInput value={formData.description} onChange={updateTextArea} />
        </div>

        <div className={styles.buttons}>
          <PrimaryButton text="Submit Book" type='submit' />
      
          <SecondaryButton text="Cancel" onClick={() => {}}/>
        </div>
      </form>
    </>
  )
};