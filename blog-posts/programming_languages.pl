% This is a blog post, just not in a natural language. It's a statement of facts, but these facts can get
% subjective. Furthermore, this program only stores relationships, it does not (strictly speaking) "compute."
% This is the spawn of a reddit comment thread wherein I decided to put my money where my mouth is.
% https://www.reddit.com/r/ProgrammingLanguages/comments/kq5yho/programming_languages_design_space/gi31d91/?context=3
%
% Either way, this is a taxonomy for programming languages. It is made both from the bottom up (looking at
% features and classifying them) and top down (considering theoretical possibilities).
%
% If this wasn't a blog post, I'd likely divide the file into two files, but instead, I have them concatenated.
% The first part defines the structure I'm going to try to place programming languages into in the second half.
% Technically, I'm not sure if "taxonomy" is precisely the right word. I think "semantic graph" could be more
% correct since I'm really enumerating triples in the second half for a forest that I define in the first half.

% So, here's the forest of programming language bits that I want to consider.
%
% Since the idea is one of a tree, the "final value" of something will be called a "leafConcept."
% Furthermore, inner nodes will be determined by "subConcept"s. Concepts that are roots of their own tree are
% named "rootConcept"s (a unary predicate). The binary predicates "b(x, y)" are read "x has a b that is y." Note
% that I've grouped the taxonomy into (hopefully) mutually exclusive values, though none technically are.

% The theoretical strength is the normal heirarchy of how powerful a language is in decision problem solving.
rootConcept(theoreticalStrength).
leafConcept(theoreticalStrength, regularLanguage).
leafConcept(theoreticalStrength, bnf).
leafConcept(theoreticalStrength, turingComplete).

% This is a vague notion that might not turn out to be useful. This might just be imperative vs. functional.
subConcept(theoreticalStrength, turingMachineImplementation).
leafConcept(turingMachineImplementation, turingMachine).
leafConcept(turingMachineImplementation, lambdaCalculus).
leafConcept(turingMachineImplementation, turingMachineWithInteraction).

% This is the intent of the language use. This is a bit like trying to understand "what the author meant" in
% literary analysis: you shouldn't do it. To say "intention" will invariably be too vague to some while too
% fine-grained to others. It's telling that there is a "general purpose" (managed vs. unmanaged pretty much
% literally meaning GC vs. no GC). "Data exploration" has a similar vagueness: it's about representing and
% querying data, not something being run end-to-end or on its own -- something that needs a driver at the wheel.
% I suppose it's best to see this as the intended use of the programming language by its common user.
rootConcept(intention).
leafConcept(intention, markup).
leafConcept(intention, theoremProver).
leafConcept(intention, managedGeneralPurpose).
leafConcept(intention, unmanagedGeneralPurpose).
leafConcept(intention, dsl).
leafConcept(intention, dataExploration).
leafConcept(intention, compilerIR).
leafConcept(intention, hardwareSpecific).

% The semantics of the type system.
rootConcept(typeSystem).
leafConcept(typeSystem, dynamic).
% This is a political agenda: I mean C++ and C# at least who have duck-typed "template <typename T>" or own up to
% it with "dynamic objects."
leafConcept(typeSystem, restrictedDynamic).
leafConcept(typeSystem, systemF).
leafConcept(typeSystem, typedLambdaCalculus).

% Some extensions of the type system
subConcept(typeSystem, extensions).
leafConcept(extensions, ownershipSemantics).
leafConcept(extensions, sizeBoundedTypes).

% The kinds (lol) of types that specify types
subConcept(typeSystem, higherTypes).
leafConcept(higherTypes, nestedUniverses).
leafConcept(higherTypes, higherKinds).
leafConcept(higherTypes, interfacesOrTraits).

% How functions are in the type system (this can overlap a lot -- like in C++, where you get the first 3)
subConcept(typeSystem, functionTypes).
leafConcept(functionTypes, functionPointers).
leafConcept(functionTypes, typeErasedTrait).
leafConcept(functionTypes, vagueNotionOfCallables).
leafConcept(functionTypes, noFunctionTypes).

% Whether user-defined types are allowed and how distinguished they are from built-ins.
subConcept(typeSystem, userDefinedTypes).
leafConcept(userDefinedTypes, allowedAsFirstClass).
leafConcept(userDefinedTypes, allowedNonPrimitive). % Consider Java. You can't make your own string.
leafConcept(userDefinedTypes, disallowed).

% How sum types are handled (not mutually exclusive).
subConcept(typeSystem, sumTypeHandling).
leafConcept(sumTypeHandling, inheritanceBasedOpenSums).
leafConcept(sumTypeHandling, inheritanceBasedClosedSums). % not exclusive with the above: consider Scala.
leafConcept(sumTypeHandling, explicitEnumeration).
leafConcept(sumTypeHandling, unsafeUnionTypes).

% The syntax of the language
rootConcept(syntax).
leafConcept(syntax, blockBased).
leafConcept(syntax, textual).

leafConcept(syntax, homoiconic).

% Note here: "templates" more or less specifically means C++ templates, Haskell's template meta-programming is
% much closer to a macro sublanguage since it's not used elsewhere. (And, ew, the C++ TMP is included with string
% substitution-based macros.)
subConcept(syntax, metaprogramming).
leafConcept(metaprogramming, macroSublanguage).
leafConcept(metaprogramming, templates).
leafConcept(metaprogramming, stringSubstitution).

% A vague idea of the "style" of the syntax.
subConcept(syntax, style).
leafConcept(style, cBased).
leafConcept(style, lispDialect).
leafConcept(style, nonLispLambdaCalculus).
leafConcept(style, imperativeNonCBased).

% The extent of pattern matching. This is almost a decreasing chain of languages, but python has list destructuring
% without switch statements.
subConcept(syntax, patternMatching).
leafConcept(patternMatching, switchStatements).
leafConcept(patternMatching, specificCases).
leafConcept(patternMatching, listDestructuring).
leafConcept(patternMatching, allDataStructures).
leafConcept(patternMatching, allTypes).
leafConcept(patternMatching, allTypesIncludingConditionalGuards).

% Exception about the reading: this means that "[S], V" is a valid path through the taxonomy to a leaf "V".
validPath([S], V) :- leafConcept(S, V).
validPath([S, T | R], V) :- subConcept(S, T), validPath([T|R], V).

% Some examples of languages and where they fit into the taxonomy. Here the "has" predicate (that just lists
% triples in the semantic graph) written "has(pl, t, v)" should be read "pl has t (that is) v".

% This is an experiment. I'm not sure how frequently I'll use this notion. "subLanguage(P, S)" should be read
% "P has sublanguage S," at which point the super language gets all the features of the sublanguage.
has(PL, T, V) :- sublanguage(PL, SPL), has(SPL, T, V).

% The Rust programming language
has(rust, [theoreticalStrength], turingComplete).
has(rust, [intention], unmanagedGeneralPurpose).
has(rust, [typeSystem], systemF). % I'm not 100% certain of this.
has(rust, [typeSystem, extensions], ownershipSemantics).
has(rust, [typeSystem, higherTypes], interfacesOrTraits).
has(rust, [typeSystem, functionTypes], typeErasedTrait).
has(rust, [typeSystem, userDefinedTypes], allowedAsFirstClass).
has(rust, [typeSystem, sumTypeHandling], explicitEnumeration).
has(rust, [syntax], textual).
has(rust, [syntax, metaprogramming], macroSubLanguage).
has(rust, [syntax, patternMatching], allTypes).

sublanguage(rust, rustMacros).
has(rustMacros, [theoreticalStrength], bnf).

% I think this is the right way to do this, but I could be wrong.
subLanguage(unsafeRust, rust).
has(unsafeRust, [typeSystem, sumTypeHandling], unsafeUnionTypes).
