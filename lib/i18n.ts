import {JBDictionary} from 'jb-core/i18n';
export type JBTimeInputDictionary = {
  close:string
}

/**
 * dictionary of jb time input. it's already loaded with persian and english lang but you can also extend it with you apps other language or replace already exist language 
 * @example 
 * ```js
 * import {dictionary} from 'jb-time-input'
 * dictionary.setLanguage("fr", {
 *  requireMessage: (label:string| null)=>`${label} french require message`,
 * // other dictionary keys
 * });
 * ```
 */
export const dictionary = new JBDictionary<JBTimeInputDictionary>({
  "fa":{
    close:"بستن"
  },
  "en":{
    close:"Close",
  }
});