import { outdent } from 'outdent'
import { match } from 'ts-pattern'
import type { Context } from '../../engines'

export function generateQwikJsxPattern(ctx: Context) {
  const { typeName, factoryName } = ctx.jsx

  return ctx.patterns.details.map((pattern) => {
    const { upperName, styleFnName, dashName, jsxName, props, blocklistType } = pattern
    const { description, jsxElement = 'div' } = pattern.config

    return {
      name: dashName,
      js: outdent`
      import { h } from '@builder.io/qwik'
      ${ctx.file.import(factoryName, './factory')}
      ${ctx.file.import(styleFnName, `../patterns/${dashName}`)}
  
      export const ${jsxName} = function ${jsxName}(props) {
        ${match(props.length)
          .with(
            0,
            () => outdent`
        const styleProps = ${styleFnName}()
        return h(${factoryName}.${jsxElement}, { ...styleProps, ...props })
          `,
          )
          .otherwise(
            () => outdent`
        const { ${props.join(', ')}, ...restProps } = props
        const styleProps = ${styleFnName}({${props.join(', ')}})
        return h(${factoryName}.${jsxElement}, { ...styleProps, ...restProps })
          `,
          )}
      }
      `,

      dts: outdent`
      import type { FunctionComponent } from '@builder.io/qwik'
      import type { ${upperName}Properties } from '../patterns/${dashName}'
      import type { ${typeName} } from '../types/jsx'
  
      type Assign<T, U> = {
        [K in keyof T]?: K extends keyof T ? (K extends keyof U ? T[K] & U[K] : T[K]) : never
      } & U

      export type ${upperName}Props = Assign<${typeName}<'${jsxElement}'>, Omit<${upperName}Properties, ${
        blocklistType || '""'
      }>>
  
      ${description ? `/** ${description} */` : ''}
      export declare const ${jsxName}: FunctionComponent<${upperName}Props>
      `,
    }
  })
}
