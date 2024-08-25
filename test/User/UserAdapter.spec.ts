import { UserAdapter, UserAdapterInterface } from "src/User/UserAdapter";
import { TokenProviders } from "src/TokenProviders";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { User } from "src/User/User";
import { Model } from "mongoose";
import { RequestError } from "src/types/RequestError";

const userList = [
    new User({ _id: '0' })
];

describe("UserAdapter", () => {
    let model: Model<User>;
    let userAdapter: UserAdapterInterface;

    const mockModel = {
        find: jest.fn(),
        findById: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn()
    }

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            providers: [
                {
                    provide: getModelToken(User.name),
                    useValue: mockModel
                },
                {
                    provide: TokenProviders.USER_ADAPTER,
                    useClass: UserAdapter
                }
            ]
        }).compile();
        model = app.get<Model<User>>(
            getModelToken(User.name)
        );
        userAdapter = app.get<UserAdapterInterface>(TokenProviders.USER_ADAPTER);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(userAdapter).toBeDefined();
        expect(model).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an user list successfuly', async () => {
            mockModel.find.mockResolvedValueOnce(userList);
            const result = await userAdapter.findAll();
            expect(result).toEqual(userList);
        });

        it('should return a request error', async () => {
            mockModel.find.mockRejectedValueOnce(new Error(""));
            const result = await userAdapter.findAll();
            expect(result).toBeInstanceOf(RequestError);
        });
    })
});