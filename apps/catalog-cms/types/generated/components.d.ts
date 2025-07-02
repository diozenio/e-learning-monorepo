import type { Schema, Struct } from '@strapi/strapi';

export interface CourseModules extends Struct.ComponentSchema {
  collectionName: 'components_course_modules';
  info: {
    displayName: 'Modules';
    icon: 'layer';
  };
  attributes: {
    lessons: Schema.Attribute.Relation<'oneToMany', 'api::lesson.lesson'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LessonKeyPoint extends Struct.ComponentSchema {
  collectionName: 'components_lesson_key_points';
  info: {
    displayName: 'Key Point';
    icon: 'check';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'course.modules': CourseModules;
      'lesson.key-point': LessonKeyPoint;
    }
  }
}
