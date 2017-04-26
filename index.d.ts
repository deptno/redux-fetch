type TAction = string|string[]|((err: string) => string);
type TActions = TAction[];

interface defaultArguments {
    okHook?: (args) => any;
    failHook?: (args) => any;
}
interface GetArguments extends defaultArguments {
    url: string;
    actions: TActions;
    query?: any;
    useLatest?: boolean;
}

interface PostArguments extends defaultArguments {
    url: string;
    actions: TActions;
    body?: any;
}

declare function GET(arg: GetArguments): boolean;
declare function POST(arg: PostArguments): boolean;
declare function PUT(arg: PostArguments): boolean;
declare function PATCH(arg: PostArguments): boolean;

interface Action {
    type: string;
    query?: any;
}
interface OkAction {
    payload: any;
}
interface ErrAction {
    error: Error;
    body?: any;
}