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
% Another formality: lines will be 120 columns wide (to set some convention).

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
% This is a political agenda: I mean C++ who has duck-typed "template <typename T>" or C# who owns up to
% it with "dynamic objects," at least.
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

% How to make subtypes
% See https://en.wikipedia.org/wiki/Subtyping#Subtyping_schemes for more
subConcept(typeSystem, subTyping).
leafConcept(subTyping, none).
leafConcept(subTyping, nominalNonInheritance).
leafConcept(subTyping, structural).
% https://en.wikipedia.org/wiki/Subtyping#Relationship_with_inheritance means this isn't technically correct, but I mean
% to include it to say that the language conflates the two ideas. Usually they'll have some inferred duck-typing that
% will just fix the implementation as needed.
leafConcept(subTyping, inheritanceBased).

% Not mutually exclusive
subConcpet(subTyping, implementation).
leafConcept(implementation, inclusiveImplementation). % Read: duck typing. So Python, JS, C++ with templates.
leafConcept(implementation, coerciveImplementation).
leafConcept(implementation, coerciveImplementationForPrimitivesOnly). % The casts for narrowing or "as" in Rust.
leafConcept(implementation, traitFindingCoercions). % <T as SomeTrait>.method in Rust, C++'s std::dynamic_cast<T>
leafConcept(implementation, explicitCoercionSystem). % C++'s std::static_cast<T>() and Rusts's From<T>.

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

% Though this is probably more about switch statements, it doesn't not apply to matches.
subConcept(patternMatching, matchFallthrough).
leafConcept(matchFallthrough, none).
leafConcept(matchFallthrough, fallthroughByDefault).
% The distinction in the below is that the keyword means "fallthrough here" whereas the
% limited goto can create loops (I have a confession to make...)
leafConcept(matchFallthrough, specifiedByKeyword).
leafConcept(matchFallthrough, specifiedByLimitedGoto). % Ahem, this is a bad idea C#, ahem.

% Whether the pattern matching must account for every case. This is about the minimum supported, not what can be added
% through compiler warnings.
subConcept(patternMatching, matchCompletenessEnforcement).
leafConcept(matchCompletenessEnforcement, none).
leafConcept(matchCompletenessEnforcement, defaultCaseMustBeProvidedIfIncomplete).
leafConcept(matchCompletenessEnforcement, allCasesMustBeProvided). % Probably mostly in theorem provers

% For features like if-let and while-let. (Only if the language has explicit control flow.)
leafConcept(patternMatching, allowedInControlFlow).

% Basic bits of control flow.
subConcept(syntax, branching).
leafConcept(branching, ifElse).
leafConcept(branching, ifElseIfElse).
leafConcept(branching, noneBuiltIn).

% Not mutually exclusive
subConcept(syntax, looping).
leafConcept(looping, whileLoop).
leafConcept(looping, forEachLoop).
leafConcept(looping, threePartForLoop).
leafConcept(looping, specializedInfiniteLoop).
leafConcept(looping, recursionOnly).
leafConcept(looping, combinatorsOnly).

% Not mutually exclusive
subConcept(looping, extraControlFlow).
leafConcept(extraControlFlow, breakStatement).
leafConcept(extraControlFlow, continueStatement).
leafConcept(extraControlFlow, labelledBreak).
leafConcept(extraControlFlow, trailingElse). % Python is the only one I know.

% How big a role expressions (parts of syntax evaluated for a value, think about the right hand side of an "=" in
% Java, C, C++) play.
subConcept(syntax, expression).
leafConcept(expression, everythingIsAnExpression).
leafConcept(expression, specificPartsOfPrograms).

subConcept(expression, delimiter).
leafConcept(delimiter, semiColon).
leafConcept(delimiter, newLine).
leafConcept(delimiter, none).

leafConcept(delimiter, allowsGroupingByCommas). % C, C++ do this.

subConcept(delimiter, meaning).
leafConcept(meaning, semiColonsInferred). % JS, Haskell, for example
leafConcept(meaning, semiColonMeansSideEffect). % Just Rust.

% Scopes: when they're defined how names enter and exit scopes
subConcept(syntax, scope).
subConcept(scope, scopeDefinition).
leafConcept(scopeDefinition, specificBlock).
leafConcept(scopeDefinition, specificContextManagement).
leafConcept(scopeDefinition, tiedToControlFlow).

subConcept(scope, nameLookup).
leafConcept(nameLookup, lexical).
leafConcept(nameLookup, dynamic).

% What type declarations look like (if present).
subConcept(syntax, typeDeclaration).
subConcept(typeDeclaration, placement).
leafConcept(placement, afterName).
leafConcept(placement, beforeName).

subConcept(typeDeclaration, genericsSyntax).
leafConcept(genericsSyntax, angleBrackets).
leafConcept(genericsSyntax, likeFunctionCall). % consider Haskell or Zig

% There are modifiers that aren't already part of the generics syntax, more so what could go around the type specifier.
subConcept(typeDeclaration, typeModifiers).
leafConcept(typeModifiers, modifierForImmutable).
leafConcept(typeModifiers, modifierForMutable).
leafConcept(typeModifiers, modifierForThreadLocality).
leafConcept(typeModifiers, modifierForPointer).
leafConcept(typeModifiers, modifierForReference).
% Not sure if this is part of the type system in C#, but may be it is elsewhere.
leafConcept(typeModifiers, modifierForOutParameter). 

% This is about handling larger projects. This is more about "software engineering practices" and how they're
% baked into the language.
rootConcept(projectManagement).
subConcept(projectManagement, singleFileBuildTool).
leafConcept(singleFileBuildTool, interpreted).
leafConcept(singleFileBuildTool, compiled).

subConcept(projectManagement, standardLibrary).
subConcept(standardLibrary, usage).
leafConcept(usage, managedByImportSystem).
leafConcept(usage, noStandardLibrary).

leafConcept(usage, conditionallyRemovable).

% Not exclusive. I should decide about how (if) I'm going to deal with implementations here.
subConcept(standardLibrary, dataStructures).
leafConcept(dataStructures, resizingArray).
leafConcept(dataStructures, balancedTree).
leafConcept(dataStructures, linkedList).
leafConcept(dataStructures, deque). % I'll ignore the inclusion that a deque is a linked list
leafConcept(dataStructures, hashMap).
leafConcept(dataStructures, priorityQueue). % To avoid confusion with the memory "heap"

% Not mutually exclusive
leafConcept(standardLibrary, includesThreading).
leafConcept(standardLibrary, includesUI). % TK in Python or Swing in Java
leafConcept(standardLibrary, includesWebServer).
leafConcept(standardLibrary, includesWebClient).
leafConcept(standardLibrary, includesFileManagement). % (and I/O, I might split this)
leafConcept(standardLibrary, includesMultiProcessing). % Python's subprocess
leafConcept(standardLibrary, includesMathematics). % Will probably have to clarify this one

subConcept(projectManagement, thirdPartyLibraryUsage).
leafConcept(thirdPartyLibraryUsage, canonicalManagementTool).
leafConcept(thirdPartyLibraryUsage, variousCommunityManagementTools).
leafConcept(thirdPartyLibraryUsage, manualOnly).

subConcept(projectManagement, libraryOrganizationScheme).
leafConcept(libraryOrganizationScheme, namespaces).
leafConcept(libraryOrganizationScheme, fileStructureOnly).
leafConcept(libraryOrganizationScheme, none).
leafConcept(libraryOrganizationScheme, ruleOfThumbForPrivateThings).

subConcept(libraryOrganizationScheme, fileNamespaceInteraction).
leafConcept(fileNamespaceInteraction, fileIsOnlyOneNamespace).
leafConcept(fileNamespaceInteraction, fileIsNoNamespace).
leafConcept(fileNamespaceInteraction, fileNamespaceCanBeOverridden).

% Not mutually exclusive (Rust has both).
subConcept(fileNamespaceInteraction, specialFileNames).
leafConcept(specialFileNames, specialFileForEntrypoint).
leafConcept(specialFileNames, specialFileForImportPathInclusion).

% Read "validPath([a, b, c], d)" as "[a, b, c] is a valid path to d".
validPath([S], V) :- leafConcept(S, V).
validPath([S, T | R], V) :- subConcept(S, T), validPath([T|R], V).

% Some examples of languages and where they fit into the taxonomy. Here the "has" predicate (that just lists
% triples in the semantic graph) written "has(pl, t, v)" should be read "pl has t (that is) v".

% The Rust programming language -- an initial example. Technically, I should have pre-async vs. post-async as
% sublangauges.
has(rust, [theoreticalStrength], turingComplete).
has(rust, [intention], unmanagedGeneralPurpose).
has(rust, [typeSystem], systemF). % I'm not 100% certain of this. I think it's mostly true.
has(rust, [typeSystem, extensions], ownershipSemantics).
has(rust, [typeSystem, higherTypes], interfacesOrTraits).
has(rust, [typeSystem, functionTypes], typeErasedTrait).
has(rust, [typeSystem, userDefinedTypes], allowedAsFirstClass).
has(rust, [typeSystem, sumTypeHandling], explicitEnumeration).
has(rust, [typeSystem, subTyping], nominalNonInheritance). % I'm counting From and To traits
has(rust, [typeSystem, subTyping, implementation], coerciveImplementationForPrimitivesOnly).
has(rust, [typeSystem, subTyping, implementation], traitFindingCoercions).
has(rust, [typeSystem, subTyping, implementation], explicitCoercionSystem).
has(rust, [syntax], textual).
has(rust, [syntax, style], cBased). % Vaguely
has(rust, [syntax, metaprogramming], macroSubLanguage).
has(rust, [syntax, patternMatching], allTypes).
has(rust, [syntax, patternMatching, matchFallthrough], none).
has(rust, [syntax, patternMatching, matchCompletenessEnforcement], defaultCaseMustBeProvidedIfIncomplete).
has(rust, [syntax, patternMatching], allowedInControlFlow).
has(rust, [syntax, branching], ifElseIfElse).
has(rust, [syntax, looping], whileLoop).
has(rust, [syntax, looping], forEachLoop).
has(rust, [syntax, looping], specializedinfiniteLoop).
has(rust, [syntax, looping, extraControlFlow], breakStatement).
has(rust, [syntax, looping, extraControlFlow], labelledBreak).
has(rust, [syntax, looping, extraControlFlow], continueStatement).
has(rust, [syntax, expression], specificPartsOfPrograms).
has(rust, [syntax, expression, delimiter], semiColon).
has(rust, [syntax, expression, delimiter, meaning], semiColonMeansSideEffect).
has(rust, [syntax, scope, scopeDefinition], specificBlock).
has(rust, [syntax, scope, scopeDefinition], tiedToControlFlow).
has(rust, [syntax, scope, nameLookup], lexical).
has(rust, [syntax, typeDeclaration, placement], afterName).
has(rust, [projectManagement, singleFileBuildTool], compiled).
has(rust, [projectManagement, standardLibrary, usage], managedByImportSystem).
has(rust, [projectManagement, standardLibrary, usage], conditionallyRemovable).
has(rust, [projectManagement, standardLibrary, dataStructures], resizingArray).
has(rust, [projectManagement, standardLibrary, dataStructures], balancedTree).
has(rust, [projectManagement, standardLibrary, dataStructures], priorityQueue).
has(rust, [projectManagement, standardLibrary, dataStructures], hashMap).
has(rust, [projectManagement, standardLibrary], includesThreading). % Sort of given that futures executors aren't.
has(rust, [projectManagement, standardLibrary], includesWebClient).
has(rust, [projectManagement, standardLibrary], includesFileManagement).
has(rust, [projectManagement, thirdPartyLibraryUsage], canonicalManagementTool).
has(rust, [projectManagement, libraryOrganizationScheme], namespaces).
has(rust, [projectManagement, libraryOrganizationScheme, fileNamespaceInteraction], fileNamespaceCanBeOverridden).
has(rust, [projectManagement, libraryOrganizationScheme, % main.rs
	   fileNamespaceInteraction, specialFileNames], specialFileForEntrypoint).
has(rust, [projectManagement, libraryOrganizationScheme, % mod.rs
	   fileNamespaceInteraction, specialFileNames], specialFileForImportPathInclusion).

sublanguage(rust, rustMacros).
has(rustMacros, [theoreticalStrength], bnf).

% I think this is the right way to do this, but I could be wrong. Here
sublanguage(unsafeRust, rust).
has(unsafeRust, [typeSystem, sumTypeHandling], unsafeUnionTypes).

% This is an experiment. I'm not sure how frequently I'll use this notion. "subLanguage(P, S)" should be read
% "P has sublanguage S," at which point the super language gets all the features of the sublanguage.
has(PL, T, V) :- sublanguage(PL, SPL), has(SPL, T, V).
